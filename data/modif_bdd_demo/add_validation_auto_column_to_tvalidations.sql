ALTER TABLE gn_commons.t_validations ADD COLUMN validation_auto boolean;
ALTER TABLE gn_commons.t_validations ALTER COLUMN validation_auto SET DEFAULT true;
COMMENT ON COLUMN gn_commons.t_validations.validation_auto IS 'Définir si la validation est manuelle ou automatique';
UPDATE gn_commons.t_validations SET validation_auto = true;
ALTER TABLE gn_commons.t_validations ALTER COLUMN validation_auto SET NOT NULL;
