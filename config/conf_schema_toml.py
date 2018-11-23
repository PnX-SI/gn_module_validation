'''
   Spécification du schéma toml des paramètres de configurations
'''

from marshmallow import Schema, fields
from geonature.utils.config_schema import GnModuleProdConf



#
DEFAULT_COLUMNS_API_VALIDATION = [
    'mnemonique',
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
    {'prop': 'mnemonique', 'name': 'Statut Validation', 'max_width': 100},
    {'prop': 'nom_vern_or_lb_nom', 'name': 'Taxon', 'max_width': 200},
    {'prop': 'date_min', 'name': 'Date obs', 'max_width': 100},
    {'prop': 'dataset_name', 'name': 'JDD', 'max_width': 200},
    {'prop': 'observers', 'name': 'Observateur', 'max_width': 200}
]

COLOR_CORRESPONDENCES = [
    {'MnemoStatus': 'En attente de validation', 'ColorStatus': '#8e8e8e'},
    {'MnemoStatus': 'Non réalisable', 'ColorStatus': '#8e8e8e'},
    {'MnemoStatus': 'Invalide', 'ColorStatus': '#FF0000'},
    {'MnemoStatus': 'Douteux', 'ColorStatus': '#FFA500'},
    {'MnemoStatus': 'Probable', 'ColorStatus': '#9ACD32'},
    {'MnemoStatus': 'Certain - très probable', 'ColorStatus': '#28a745'}
]

class GnModuleSchemaConf(GnModuleProdConf):
    MANDATORY_COLUMNS = fields.List(fields.String(), missing=MANDATORY_COLUMNS)
    COLOR_CORRESPONDENCES = fields.List(fields.Dict(), missing=COLOR_CORRESPONDENCES)
    COLUMNS_API_VALIDATION_WEB_APP = fields.List(fields.String, missing=DEFAULT_COLUMNS_API_VALIDATION)
    LIST_COLUMNS_FRONTEND = fields.List(fields.Dict, missing=DEFAULT_LIST_COLUMN)
    NB_MAX_OBS_MAP = fields.Integer(missing=10000)
