export const ModuleConfig = {
 "COLUMNS_API_VALIDATION_WEB_APP": [
  "mnemonique",
  "id_synthese",
  "date_min",
  "observers",
  "nom_valide",
  "dataset_name"
 ],
 "LIST_COLUMNS_FRONTEND": [
   {
    "max_width": 100,
    "name": "Statut Validation",
    "prop": "mnemonique"
    "colors": [
      {
        "MnemoStatus": "En attente de validation",
        "ColorStatus": "#8e8e8e"
      },
      {
        "MnemoStatus": "Non réalisable",
        "ColorStatus": "#8e8e8e"
      },
      {
        "MnemoStatus": "Invalide",
        "ColorStatus": "#FF0000"
      },
      {
        "MnemoStatus": "Douteux",
        "ColorStatus": "#FFA500"
      },
      {
        "MnemoStatus": "Probable",
        "ColorStatus": "#9ACD32"
      },
      {
        "MnemoStatus": "Certain - très probable",
        "ColorStatus": "#28a745"
      }]
   },
  {
   "max_width": 200,
   "name": "Taxon",
   "prop": "nom_vern_or_lb_nom"
  },
  {
   "max_width": 100,
   "name": "Date obs",
   "prop": "date_min"
  },
  {
   "max_width": 200,
   "name": "JDD",
   "prop": "dataset_name"
  },
  {
   "max_width": 200,
   "name": "observateur",
   "prop": "observers"
 }],
 "MANDATORY_COLUMNS": [
  "entity_source_pk_value",
  "url_source",
  "cd_nom"
 ],
 "NB_MAX_OBS_MAP": 10000,
 "api_url": "/validation",
 "id_application": 8
}
