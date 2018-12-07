CREATE OR REPLACE FUNCTION gn_commons.fct_trg_update_synthese_validation_status()
    RETURNS trigger AS
$BODY$
-- This trigger function update validation informations in corresponding row in synthese table
BEGIN
  UPDATE gn_synthese.synthese 
  SET id_nomenclature_valid_status = NEW.id_nomenclature_valid_status,
  validation_comment = NEW.validation_comment,
  validator = (SELECT nom_role || ' ' || prenom_role FROM utilisateurs.t_roles WHERE id_role = NEW.id_validator)::text
  WHERE unique_id_sinp = NEW.uuid_attached_row;
RETURN NEW;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;


 CREATE TRIGGER tri_insert_synthese_update_validation_status
  AFTER INSERT
  ON gn_commons.t_validations
  FOR EACH ROW
  EXECUTE PROCEDURE gn_commons.fct_trg_update_synthese_validation_status();
