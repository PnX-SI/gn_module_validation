export const ModuleConfig = {
    "MAX_EXPORT_NUMBER": 50000,
    "available_maplist_column": [
     {
      "name": "altitude_max",
      "prop": "altitude_max"
     },
     {
      "name": "altitude_min",
      "prop": "altitude_min"
     },
     {
      "name": "Commentaire",
      "prop": "comment"
     },
     {
      "name": "Date fin",
      "prop": "date_max"
     },
     {
      "name": "Date d\u00e9but",
      "prop": "date_min"
     },
     {
      "name": "ID dataset",
      "prop": "id_dataset"
     },
     {
      "name": "ID r\u00e9dacteur",
      "prop": "id_digitiser"
     },
     {
      "name": "ID relev\u00e9",
      "prop": "id_releve_occtax"
     },
     {
      "name": "observateurs",
      "prop": "observateurs"
     },
     {
      "name": "taxons",
      "prop": "taxons"
     }
    ],
    "default_maplist_columns": [
     {
      "name": "Taxon",
      "prop": "taxons"
     },
     {
      "name": "Date d\u00e9but",
      "prop": "date_min"
     },
     {
      "name": "Observateurs",
      "prop": "observateurs"
     },
     {
      "name": "Jeu de donn\u00e9es",
      "prop": "dataset_name"
     }
    ],
    "digital_proof_validator": true,
    "export_available_format": [
     "csv",
     "geojson",
     "shapefile"
    ],
    "export_columns": [
     "permId",
     "statObs",
     "nomCite",
     "dateDebut",
     "dateFin",
     "heureDebut",
     "heureFin",
     "altMax",
     "altMin",
     "cdNom",
     "cdRef",
     "dateDet",
     "comment",
     "dSPublique",
     "statSource",
     "idOrigine",
     "refBiblio",
     "obsMeth",
     "ocEtatBio",
     "ocNat",
     "ocSex",
     "ocStade",
     "ocBiogeo",
     "ocStatBio",
     "preuveOui",
     "ocMethDet",
     "preuvNum",
     "preuvNoNum",
     "obsCtx",
     "permIdGrp",
     "methGrp",
     "typGrp",
     "denbrMax",
     "denbrMin",
     "objDenbr",
     "typDenbr",
     "obsId",
     "obsNomOrg",
     "detId",
     "detNomOrg",
     "orgGestDat",
     "WKT",
     "natObjGeo"
    ],
    "export_geom_columns_name": "geom_4326",
    "export_id_column_name": "permId",
    "export_message": "\n<p> <b> Attention: </b> </br>\nVous vous appr\u00eatez \u00e0 t\u00e9l\u00e9charger les donn\u00e9es de la <b>recherche courante. </b> </p>\n",
    "export_srid": 4326,
    "export_view_name": "export_occtax_dlb",
    "form_fields": {
     "counting": {
      "count_max": true,
      "count_min": true,
      "life_stage": true,
      "obj_count": true,
      "sex": true,
      "type_count": true,
      "validation_status": false
     },
     "occurrence": {
      "bio_condition": true,
      "bio_status": true,
      "blurring": false,
      "comment": true,
      "determination_method": true,
      "determiner": true,
      "diffusion_level": false,
      "digital_proof": true,
      "exist_proof": true,
      "naturalness": true,
      "non_digital_proof": true,
      "obs_method": true,
      "observation_status": true,
      "sample_number_proof": true,
      "source_status": false
     },
     "releve": {
      "altitude_max": true,
      "altitude_min": true,
      "comment": true,
      "date_max": true,
      "date_min": true,
      "group_type": false,
      "hour_max": true,
      "hour_min": true,
      "obs_technique": false
     }
    },
    "id_observers_list": 9,
    "id_taxon_list": 500,
    "list_messages": {
     "emptyMessage": "Aucune donn\u00e9e \u00e0 afficher",
     "totalMessage": "Relev\u00e9(s) au total"
    },
    "observers_txt": false,
    "releve_map_zoom_level": 6
   }