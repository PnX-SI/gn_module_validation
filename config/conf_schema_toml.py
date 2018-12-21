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
    "color":"#8BC34A"
  },
  "319" : {
    "cat":"assessable",
    "color":"#CDDC39"
  },
  "320" : {
    "cat":"assessable",
    "color":"#FF9800"
  },
  "321" : {
    "cat":"assessable",
    "color":"#FF5722"
  },
  "322" : {
    "cat":"notassessable",
    "color":"#BDBDBD"
  },
  "466" : {
    "cat":"notassessed",
    "color":"#FFFFFF"
  }
}

MAP_POINT_STYLE = {
    'originStyle' :
        {'color': '#1976D2','fill': True,'fillOpacity': 0,'weight': 3},
    'selectedStyle' :
        {'color': '#1976D2','fill': True,'fillColor': '#1976D2','fillOpacity': 0.5,'weight': 3}
 }

ICON_FOR_AUTOMATIC_VALIDATION = "computer"

ZOOM_SINGLE_POINT = 12

id_for_enAttenteDeValidation = 466

DISPLAY_TAXON_TREE = True

ID_ATTRIBUT_TAXHUB = [1, 2]

AREA_FILTERS = [
    { "label": "Communes", "id_type": 25 },
]


class GnModuleSchemaConf(GnModuleProdConf):
    MANDATORY_COLUMNS = fields.List(fields.String(), missing=MANDATORY_COLUMNS)
    STATUS_INFO = fields.Dict(fields.Dict(), missing=STATUS_INFO)
    COLUMNS_API_VALIDATION_WEB_APP = fields.List(fields.String, missing=DEFAULT_COLUMNS_API_VALIDATION)
    LIST_COLUMNS_FRONTEND = fields.List(fields.Dict, missing=DEFAULT_LIST_COLUMN)
    NB_MAX_OBS_MAP = fields.Integer(missing=10000)
    MAP_POINT_STYLE = fields.Dict(fields.Dict(), missing=MAP_POINT_STYLE)
    ICON_FOR_AUTOMATIC_VALIDATION = fields.String(missing=ICON_FOR_AUTOMATIC_VALIDATION)
    ZOOM_SINGLE_POINT = fields.Integer(missing=ZOOM_SINGLE_POINT)
    id_for_enAttenteDeValidation = fields.Integer(missing=id_for_enAttenteDeValidation)
    id_application = fields.Integer(required=True)
    api_url = fields.String(required=True)
    DISPLAY_TAXON_TREE = fields.Boolean(missing=True)
    ID_ATTRIBUT_TAXHUB = fields.List(fields.Integer, missing=ID_ATTRIBUT_TAXHUB)
    AREA_FILTERS = fields.List(fields.Dict, missing=AREA_FILTERS)
