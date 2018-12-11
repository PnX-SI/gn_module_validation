export const ModuleConfig = {
 "COLUMNS_API_VALIDATION_WEB_APP": [
  "validation_auto",
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
  "cd_nom"
 ],
 "MAP_POINT_STYLE": {
  "originStyle": {
   "color": "#3388ff",
   "fill": true,
   "fillOpacity": 0,
   "weight": 3
  },
  "selectedStyle": {
   "color": "#3388ff",
   "fillColor": "#ff0000",
   "fillOpacity": 0.5,
   "weight": 3
  }
 },
 "NB_MAX_OBS_MAP": 10000,
 "STATUS_INFO": {
  "318": {
   "cat": "assessable",
   "color": "#28a745"
  },
  "319": {
   "cat": "assessable",
   "color": "#9ACD32"
  },
  "320": {
   "cat": "assessable",
   "color": "#FFA500"
  },
  "321": {
   "cat": "assessable",
   "color": "#FF0000"
  },
  "322": {
   "cat": "notassessable",
   "color": "#8e8e8e"
  },
  "466": {
   "cat": "notassessed",
   "color": "#8e8e8e"
  }
 },
 "api_url": "/validation",
 "id_application": 8
}
