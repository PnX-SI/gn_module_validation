from flask import (
    Blueprint,
    current_app,
    request
    )

from operator import itemgetter

import pdb

import re

from sqlalchemy import select, desc, cast, DATE, func
import pdb
import datetime
from geojson import FeatureCollection

from geonature.utils.utilssqlalchemy import json_resp

from geonature.core.gn_meta.models import TDatasets

from geonature.core.gn_synthese.models import (
    Synthese,
    TSources,
    VMTaxonsSyntheseAutocomplete
    )

from geonature.core.gn_commons.models import BibTablesLocation

from .query import filter_query_all_filters

from geonature.utils.env import DB

from .models import (
    TValidations,
    VLatestValidationForWebApp,
    VValidationsForWebApp
    )

#from geonature.core.gn_synthese.utils import query as synthese_query

from pypnusershub import routes as fnauth
from pypnnomenclature.models import TNomenclatures

blueprint = Blueprint('validation', __name__)


@blueprint.route('', methods=['GET'])
@fnauth.check_auth_cruved('R', True)
@json_resp
def get_synthese_data(info_role):

    """
        return synthese and t_validations data filtered by form params
        Params must have same synthese fields names
    """

    filters = {key: value.split(',') for key, value in dict(request.args).items()}

    if 'limit' in filters:
        result_limit = filters.pop('limit')[0]
        onlyAwaiting = True
    else:
        result_limit = blueprint.config['NB_MAX_OBS_MAP']
        onlyAwaiting = False

    allowed_datasets = TDatasets.get_user_datasets(info_role)

    q = DB.session.query(VLatestValidationForWebApp)

    if onlyAwaiting:
        q = DB.session.query(VLatestValidationForWebApp).filter(VLatestValidationForWebApp.id_nomenclature_valid_status == blueprint.config['id_for_enAttenteDeValidation'])

    q = filter_query_all_filters(VLatestValidationForWebApp, q, filters, info_role, allowed_datasets, blueprint.config)

    q = q.order_by(
        VLatestValidationForWebApp.validation_date.desc()
    )

    nb_total = 0

    data = q.limit(result_limit)
    columns = blueprint.config['COLUMNS_API_VALIDATION_WEB_APP'] + blueprint.config['MANDATORY_COLUMNS']


    features = []

    #DB.session.query(VValidation3ForWebApp).get(1).get_geofeature(columns=columns)
    for d in data:
        feature = d.get_geofeature(
            columns=columns
        )
        feature['properties']['nom_vern_or_lb_nom'] = d.nom_vern if d.lb_nom is None else d.lb_nom
        features.append(feature)

    return {
        'data': FeatureCollection(features),
        'nb_obs_limited': nb_total == blueprint.config['NB_MAX_OBS_MAP'],
        'nb_total': nb_total,
    }


@blueprint.route('/statusNames', methods=['GET'])
@fnauth.check_auth_cruved('R', True)
@json_resp
def get_statusNames(info_role):
    try:
        status = {}
        for key in blueprint.config['STATUS_INFO'].keys():
            status_name = DB.session.execute(select([TNomenclatures.mnemonique]).where(TNomenclatures.id_nomenclature == int(key))).fetchone()
            status.update({key:status_name[0]})
        return status
    except Exception:
        return 'INTERNAL SERVER ERROR ("get_status_names() error"): contactez l\'administrateur du site',500


@blueprint.route('/<id_synthese>', methods=['GET','POST'])
@fnauth.check_auth_cruved('C', True)
@json_resp
def post_status(info_role,id_synthese):
    try:
        print('id_role = ', info_role.id_role)

        data = dict(request.get_json())
        validation_status = data['statut']
        validation_comment = data['comment']

        expected_values = []
        for id in blueprint.config['STATUS_INFO'].keys():
            expected_values.append(int(id))

        if validation_status == '':
            return 'Aucun statut de validation n\'est sélectionné', 400

        if int(validation_status) not in expected_values:
            return 'INTERNAL SERVER ERROR : providing wrong status / contactez l\'administrateur du site', 500

        id_synthese = id_synthese.split(',')

        for id in id_synthese:

            # t_validations.id_validation:
            id_val = 1 #auto-incremented in t_validations

            # t_validations.id_table_location:
            # get id_source value of the observation in synthese table
            synthese_id_source = select([Synthese.id_source]).where(Synthese.id_synthese == int(id))
            # get entity_source_pk_field value of the observation in TSources table with id_source value
            entity_source_pk_field = DB.session.execute(select([TSources.entity_source_pk_field]).where(TSources.id_source == synthese_id_source)).fetchone()[0]
            # get id_table_location in BibTablesLocation by decomposition of entity_source_pk_field in schema_name and table_name values
            id_table_loc = \
            DB.session.query(BibTablesLocation.id_table_location).\
                filter(BibTablesLocation.schema_name == str(entity_source_pk_field).split('.')[0],\
                       BibTablesLocation.table_name == str(entity_source_pk_field).split('.')[1])

            if DB.session.execute(id_table_loc).fetchone() == None:
                return 'INTERNAL SERVER ERROR : problem in BibTablesLocation.schema_name or .table_name / contactez l\'administrateur du site', 500

            # t_validations.uuid_attached_row:
            uuid = DB.session.query(Synthese.unique_id_sinp).filter(Synthese.id_synthese == int(id))

            # t_validations.id_nomenclature_valid_status:
            id_nomenclature_status = DB.session.query(TNomenclatures.id_nomenclature).filter(TNomenclatures.id_nomenclature == validation_status)

            # t_validations.id_validator:
            id_valdator = info_role.id_role

            # t_validations.validation_comment
            comment = validation_comment

            # t_validations.validation_date
            val_date = datetime.datetime.now()

            # t_validations.validation_auto
            val_auto = False

            # insert values in t_validations
            addValidation = TValidations(
                id_val,
                id_table_loc,
                uuid,
                id_nomenclature_status,
                id_valdator,
                comment,
                val_date,
                val_auto
            )

            DB.session.add(addValidation)
            DB.session.commit()

        DB.session.close()

        return data

    except Exception:
        return 'INTERNAL SERVER ERROR : contactez l\'administrateur du site',500


@blueprint.route('/definitions', methods=['GET'])
@fnauth.check_auth_cruved('R', True)
@json_resp
def get_definitions(info_role):
    """
        return validation status definitions stored in t_nomenclatures
    """
    definitions = []
    for key in blueprint.config['STATUS_INFO'].keys():
        nomenclature_statut = DB.session.execute(select([TNomenclatures.mnemonique]).where(TNomenclatures.id_nomenclature == int(key))).fetchone()
        nomenclature_definitions = DB.session.execute(select([TNomenclatures.definition_default]).where(TNomenclatures.id_nomenclature == int(key))).fetchone()
        definitions.append({"status_id":key,"status":nomenclature_statut[0],"definition":nomenclature_definitions[0]})
    return definitions


@blueprint.route('/taxons_autocomplete', methods=['GET'])
@json_resp
def get_autocomplete_taxons_synthese():

    search_name = request.args.get('search_name')
    q = DB.session.query(VMTaxonsSyntheseAutocomplete)
    if search_name:
        search_name = search_name.replace(' ', '%')
        q = q.filter(
            VMTaxonsSyntheseAutocomplete.search_name.ilike(search_name+"%")
        )
    regne = request.args.get('regne')
    if regne:
        q = q.filter(VMTaxonsSyntheseAutocomplete.regne == regne)

    group2_inpn = request.args.get('group2_inpn')
    if group2_inpn:
        q = q.filter(VMTaxonsSyntheseAutocomplete.group2_inpn == group2_inpn)

    q = q.order_by(desc(
        VMTaxonsSyntheseAutocomplete.cd_nom ==
        VMTaxonsSyntheseAutocomplete.cd_ref
    ))

    data = q.limit(20).all()
    return [d.as_dict() for d in data]


@blueprint.route('/history/<id_synthese>', methods=['GET'])
@fnauth.check_auth_cruved('R', True)
@json_resp
def get_hist(info_role,id_synthese):

    try:
        q = DB.session.execute(
            select([
                VValidationsForWebApp.id_nomenclature_valid_status,
                VValidationsForWebApp.validation_date,
                VValidationsForWebApp.validation_comment,
                VValidationsForWebApp.validator,
                VValidationsForWebApp.validation_auto])
            .where(VValidationsForWebApp.id_synthese == id_synthese))

        q = q.fetchall()

        history = []
        for row in q:
            line = {}
            line.update({'id_status':str(row[0]),'date':str(row[1]),'comment':str(row[2]),'validator':str(row[3]),'typeValidation':str(row[4])})
            history.append(line)

        history = sorted(history, key=itemgetter('date'),reverse=True)
        return history

    except(Exception):
        return 'INTERNAL SERVER ERROR ("get_hist() error"): contactez l\'administrateur du site',500
