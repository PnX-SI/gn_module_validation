export const ModuleConfig = {
 "AREA_FILTERS": [
  {
   "id_type": 25,
   "label": "Communes"
  }
 ],
 "COLUMNS_API_VALIDATION_WEB_APP": [
  "validation_auto",
  "id_nomenclature_valid_status",
  "id_synthese",
  "date_min",
  "observers",
  "nom_valide",
  "dataset_name",
  "validation_date"
 ],
 "DISPLAY_TAXON_TREE": true,
 "ICON_FOR_AUTOMATIC_VALIDATION": "computer",
 "ID_ATTRIBUT_TAXHUB": [
  1,
  2
 ],
 "ID_MODULE": 7,
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
   "name": "Jeu de donnees",
   "prop": "dataset_name"
  },
  {
   "max_width": 200,
   "name": "Observateur",
   "prop": "observers"
  }
 ],
 "MANDATORY_COLUMNS": [
  "entity_source_pk_value",
  "url_source",
  "cd_nom",
  "meta_update_date"
 ],
 "MAP_POINT_STYLE": {
  "originStyle": {
   "color": "#1976D2",
   "fill": true,
   "fillOpacity": 0,
   "weight": 3
  },
  "selectedStyle": {
   "color": "#1976D2",
   "fill": true,
   "fillColor": "#1976D2",
   "fillOpacity": 0.5,
   "weight": 3
  }
 },
 "MODULE_CODE": "VALIDATION",
 "MODULE_URL": "validation",
 "NB_MAX_OBS_MAP": 10000,
 "STATUS_INFO": {
  "317": {
   "cat": "assessable",
   "color": "#8BC34A"
  },
  "318": {
   "cat": "assessable",
   "color": "#CDDC39"
  },
  "319": {
   "cat": "assessable",
   "color": "#FF9800"
  },
  "320": {
   "cat": "assessable",
   "color": "#FF5722"
  },
  "321": {
   "cat": "notassessable",
   "color": "#BDBDBD"
  },
  "465": {
   "cat": "notassessed",
   "color": "#FFFFFF"
  }
 },
 "ZOOM_SINGLE_POINT": 12,
 "id_for_enAttenteDeValidation": 465
}