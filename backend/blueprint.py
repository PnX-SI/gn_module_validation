from flask import Blueprint, current_app
import pdb
from geojson import FeatureCollection

from geonature.utils.utilssqlalchemy import json_resp

from geonature.core.gn_meta.models import TDatasets

from geonature.utils.env import DB

from .models import (VValidationForWebApp)

#from geonature.core.gn_synthese.utils import query as synthese_query

from pypnusershub import routes as fnauth


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

    q = DB.session.query(VValidationForWebApp)

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
