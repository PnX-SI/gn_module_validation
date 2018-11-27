SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

-- View: gn_commons.v_validations_for_web_app

CREATE OR REPLACE VIEW gn_commons.v_validations_for_web_app AS
-- WITH actors AS (SELECT
--   s.id_synthese,
--    array_agg(cda.id_role) AS actor_role_ids,
--    array_agg(cda.id_organism) AS actor_organisme_ids
--  FROM gn_synthese.synthese s
--   JOIN gn_meta.t_datasets d ON d.id_dataset = s.id_dataset
--   JOIN gn_meta.cor_dataset_actor cda ON cda.id_dataset = d.id_dataset
--  GROUP BY s.id_synthese
-- )
 SELECT s.id_synthese,
    s.unique_id_sinp,
    s.unique_id_sinp_grp,
    s.id_source,
    s.entity_source_pk_value,
    s.count_min,
    s.count_max,
    s.nom_cite,
    s.meta_v_taxref,
    s.sample_number_proof,
    s.digital_proof,
    s.non_digital_proof,
    s.altitude_min,
    s.altitude_max,
    s.the_geom_4326,
    s.date_min,
    s.date_max,
    s.validator,
    s.observers,
    s.id_digitiser,
    s.determiner,
    s.comments,
    s.meta_validation_date,
    s.meta_create_date,
    s.meta_update_date,
    s.last_action,
    d.id_dataset,
    d.dataset_name,
    d.id_acquisition_framework,
    s.id_nomenclature_geo_object_nature,
    s.id_nomenclature_info_geo_type,
    s.id_nomenclature_grp_typ,
    s.id_nomenclature_obs_meth,
    s.id_nomenclature_obs_technique,
    s.id_nomenclature_bio_status,
    s.id_nomenclature_bio_condition,
    s.id_nomenclature_naturalness,
    s.id_nomenclature_exist_proof,
    s.id_nomenclature_diffusion_level,
    s.id_nomenclature_life_stage,
    s.id_nomenclature_sex,
    s.id_nomenclature_obj_count,
    s.id_nomenclature_type_count,
    s.id_nomenclature_sensitivity,
    s.id_nomenclature_observation_status,
    s.id_nomenclature_blurring,
    s.id_nomenclature_source_status,
    sources.name_source,
    sources.url_source,
    t.cd_nom,
    t.cd_ref,
    t.nom_valide,
    t.lb_nom,
    t.nom_vern,
    v.id_validation,
    v.id_table_location,
    v.uuid_attached_row,
    v.id_nomenclature_valid_status,
    v.id_validator,
    v.validation_comment,
    v.validation_date,
    v.validation_auto,
    n.mnemonique
   FROM gn_synthese.synthese s
     JOIN taxonomie.taxref t ON t.cd_nom = s.cd_nom
     JOIN gn_meta.t_datasets d ON d.id_dataset = s.id_dataset
     JOIN gn_synthese.t_sources sources ON sources.id_source = s.id_source
     JOIN gn_commons.t_validations v ON v.uuid_attached_row = s.unique_id_sinp
     JOIN ref_nomenclatures.t_nomenclatures n ON n.id_nomenclature = v.id_nomenclature_valid_status;


CREATE OR REPLACE VIEW gn_commons.v_latest_validations_for_web_app AS
-- WITH actors AS (SELECT
--   s.id_synthese,
--    array_agg(cda.id_role) AS actor_role_ids,
--    array_agg(cda.id_organism) AS actor_organisme_ids
--  FROM gn_synthese.synthese s
--   JOIN gn_meta.t_datasets d ON d.id_dataset = s.id_dataset
--   JOIN gn_meta.cor_dataset_actor cda ON cda.id_dataset = d.id_dataset
--  GROUP BY s.id_synthese
-- )
select v1.*
from gn_commons.v_validations_for_web_app v1
join
(
	SELECT id_synthese, Max(validation_date)
	FROM gn_commons.v_validations_for_web_app
	GROUP BY id_synthese
) v2 on v1.validation_date = v2.max AND v1.id_synthese = v2.id_synthese;
