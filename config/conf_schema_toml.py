'''
   Spécification du schéma toml des paramètres de configurations
'''

from marshmallow import Schema, fields
from geonature.utils.config_schema import GnModuleProdConf


#
DEFAULT_COLUMNS_API_VALIDATION = [
    'validation_auto',
    'mnemonique',
    'id_nomenclature_valid_status',
    'id_synthese',
    'date_min',
    'observers',
    'nom_valide',
    'dataset_name'
]

# Colonnes renvoyer par l'API synthese qui sont obligatoires pour que les fonctionnalités
#  front foncitonnent
MANDATORY_COLUMNS = [
    'entity_source_pk_value',
    'url_source',
    'cd_nom'
]

# CONFIG MAP-LIST
DEFAULT_LIST_COLUMN = [
    {'prop': 'id_nomenclature_valid_status', 'name': '', 'max_width': 40},
    {'prop': 'nom_vern_or_lb_nom', 'name': 'Taxon', 'max_width': 150},
    {'prop': 'date_min', 'name': 'Date obs.', 'max_width': 100},
    {'prop': 'dataset_name', 'name': 'Jeu de donnees', 'max_width': 200},
    {'prop': 'observers', 'name': 'Observateur', 'max_width': 200}
]

STATUS_COLORS = [
    # ne pas changer les couleurs
     {"466":"#8e8e8e","322":"#8e8e8e","321":"#FF0000","320":"#FFA500","319":"#9ACD32","318":"#28a745"}
 ]

originStyle = [
    {'color': '#3388ff','fill': True,'fillOpacity': 0,'weight': 3}
]

selectedStyle = [
    {'color': '#3388ff','fillColor': '#ff0000','fillOpacity': 0.8,'weight': 3}
 ]

class GnModuleSchemaConf(GnModuleProdConf):
    MANDATORY_COLUMNS = fields.List(fields.String(), missing=MANDATORY_COLUMNS)
    STATUS_COLORS = fields.List(fields.Dict(), missing=STATUS_COLORS)
    COLUMNS_API_VALIDATION_WEB_APP = fields.List(fields.String, missing=DEFAULT_COLUMNS_API_VALIDATION)
    LIST_COLUMNS_FRONTEND = fields.List(fields.Dict, missing=DEFAULT_LIST_COLUMN)
    NB_MAX_OBS_MAP = fields.Integer(missing=10000)
    originStyle = fields.List(fields.Dict(), missing=originStyle)
    selectedStyle = fields.List(fields.Dict(), missing=selectedStyle)
    id_application = fields.Integer(required=True)
    api_url = fields.String(required=True)
