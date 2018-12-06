export const ModuleConfig = {
 "api_url": "/validation",
 "COLUMNS_API_VALIDATION_WEB_APP": [
  "validation_auto",
  "mnemonique",
  "id_nomenclature_valid_status",
  "id_synthese",
  "date_min",
  "observers",
  "nom_valide",
  "dataset_name"
 ],
 "LIST_COLUMNS_FRONTEND": [
   {
    "max_width": 40,
    "name": "",
    "prop": "id_nomenclature_valid_status"
   },
  {
   "max_width": 150,
   "name": "Taxon",
   "prop": "nom_vern_or_lb_nom"
  },
  {
   "max_width": 100,
   "name": "Date obs.",
   "prop": "date_min"
  },
  {
   "max_width": 200,
   "name": "Jeu de données",
   "prop": "dataset_name"
  },
  {
   "max_width": 200,
   "name": "Observateur",
   "prop": "observers"
 }],
 "MANDATORY_COLUMNS": [
  "entity_source_pk_value",
  "url_source",
  "cd_nom"
 ],
 "STATUS_COLORS": [
   {
     "466":"#8e8e8e",
     "322":"#8e8e8e",
     "321":"#FF0000",
     "320":"#FFA500",
     "319":"#9ACD32",
     "318":"#28a745"
   }],
 "NB_MAX_OBS_MAP": 10000,
 "id_application": 8
}
