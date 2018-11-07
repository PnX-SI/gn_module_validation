from flask import (
    Blueprint,
    current_app,
    request
    )
from sqlalchemy import select
import pdb
import datetime
from geojson import FeatureCollection

from geonature.utils.utilssqlalchemy import json_resp

from geonature.core.gn_meta.models import TDatasets

from geonature.core.gn_synthese.models import Synthese

from geonature.utils.env import DB

from .models import (
    VLastValidationForWebApp,
    TValidations
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
        return synthese row(s) filtered by form params
        Params must have same synthese fields names
    """
    result_limit = blueprint.config['NB_MAX_OBS_MAP']

    allowed_datasets = TDatasets.get_user_datasets(info_role)

    q = DB.session.query(VLastValidationForWebApp)

    """
    q = synthese_query.filter_query_all_filters(VSyntheseForWebApp, q, filters, info_role, allowed_datasets)
    q = q.order_by(
        VSyntheseForWebApp.date_min.desc()
    )
    """
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
        'nb_total': nb_total
    }

@blueprint.route('/<id_synthese>', methods=['GET','POST'])
@fnauth.check_auth_cruved('C', True)
@json_resp
def post_status(info_role,id_synthese):
    # faire validations pour multiples observations
    # trouver pour id_table_loc
    # trouver pour id_locator
    data = dict(request.get_json())

    print(data)
    print('id_synthese = ' + id_synthese)

    l_id_synthese = []
    for t in list(id_synthese):
        try:
            l_id_synthese.append(int(t))
        except ValueError:
            pass

    for id in l_id_synthese:

        validation_status = data['status']
        validation_comment = data['comment']
        if validation_status == '':
            return 'Veuillez sélectionner un statut de validation ou cliquez sur annuler'

        id_val = 1
        id_table_loc = 4
        uuid = select([Synthese.unique_id_sinp]).where(Synthese.id_synthese == id)
        id_nomenclature_status = select([TNomenclatures.id_nomenclature]).where(TNomenclatures.mnemonique == validation_status)
        id_valdator = 5
        comment = validation_comment
        val_date = datetime.datetime.now()

        addValidation = TValidations(
            id_val,
            id_table_loc,
            uuid,
            id_nomenclature_status,
            id_valdator,
            comment,
            val_date
        )

        DB.session.add(addValidation)
        DB.session.commit()

    DB.session.close()

    """
    Data = select([data])
    DB.session.execute(data).fetchall()
    """
    return data
