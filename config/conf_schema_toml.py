'''
   Spécification du schéma toml des paramètres de configurations
'''

from marshmallow import Schema, fields
from geonature.utils.config_schema import GnModuleProdConf


#
DEFAULT_COLUMNS_API_VALIDATION = [
    'validation_auto',
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

# id_nomenclature_valid_status used for validation module
STATUS_INFO = {
  "318" : {
    "cat":"assessable",
    "color":"#28a745"
  },
  "319" : {
    "cat":"assessable",
    "color":"#9ACD32"
  },
  "320" : {
    "cat":"assessable",
    "color":"#FFA500"
  },
  "321" : {
    "cat":"assessable",
    "color":"#FF0000"
  },
  "322" : {
    "cat":"notassessable",
    "color":"#8e8e8e"
  },
  "466" : {
    "cat":"notassessed",
    "color":""
  }
}

MAP_POINT_STYLE = {
    'originStyle' :
        {'color': '#3388ff','fill': True,'fillOpacity': 0,'weight': 3},
    'selectedStyle' :
        {'color': '#3388ff','fillColor': '#ff0000','fillOpacity': 0.5,'weight': 3}
 }

ICON_FOR_AUTOMATIC_VALIDATION = "computer"

ZOOM_SINGLE_POINT = 12


class GnModuleSchemaConf(GnModuleProdConf):
    MANDATORY_COLUMNS = fields.List(fields.String(), missing=MANDATORY_COLUMNS)
    STATUS_INFO = fields.Dict(fields.Dict(), missing=STATUS_INFO)
    COLUMNS_API_VALIDATION_WEB_APP = fields.List(fields.String, missing=DEFAULT_COLUMNS_API_VALIDATION)
    LIST_COLUMNS_FRONTEND = fields.List(fields.Dict, missing=DEFAULT_LIST_COLUMN)
    NB_MAX_OBS_MAP = fields.Integer(missing=10000)
    MAP_POINT_STYLE = fields.Dict(fields.Dict(), missing=MAP_POINT_STYLE)
    ICON_FOR_AUTOMATIC_VALIDATION = fields.String(missing=ICON_FOR_AUTOMATIC_VALIDATION)
    ZOOM_SINGLE_POINT = fields.Integer(missing=ZOOM_SINGLE_POINT)
    id_application = fields.Integer(required=True)
    api_url = fields.String(required=True)
