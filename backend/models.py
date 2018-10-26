from geonature.utils.env import DB
from sqlalchemy import ForeignKey
from geonature.utils.utilssqlalchemy import (
    serializable, geoserializable
)
from sqlalchemy.dialects.postgresql import UUID
from geoalchemy2 import Geometry


@serializable
@geoserializable
class VValidationForWebApp(DB.Model):
    __tablename__ = 'v_validations_for_web_app'
    __table_args__ = {'schema': 'gn_commons'}

    id_synthese = DB.Column(DB.Integer, ForeignKey(
        'gn_synthese.v_synthese_decode_nomenclatures.id_synthese'), primary_key=True)
    unique_id_sinp = DB.Column(UUID(as_uuid=True))
    unique_id_sinp_grp = DB.Column(UUID(as_uuid=True))
    id_source = DB.Column(DB.Integer)
    entity_source_pk_value = DB.Column(DB.Integer)
    id_dataset = DB.Column(DB.Integer)
    dataset_name = DB.Column(DB.Integer)
    id_acquisition_framework = DB.Column(DB.Integer)
    count_min = DB.Column(DB.Integer)
    count_max = DB.Column(DB.Integer)
    cd_nom = DB.Column(DB.Integer)
    cd_ref = DB.Column(DB.Unicode)
    nom_cite = DB.Column(DB.Unicode)
    nom_valide = DB.Column(DB.Unicode)
    nom_vern = DB.Column(DB.Unicode)
    lb_nom = DB.Column(DB.Unicode)
    meta_v_taxref = DB.Column(DB.Unicode)
    sample_number_proof = DB.Column(DB.Unicode)
    digital_proof = DB.Column(DB.Unicode)
    non_digital_proof = DB.Column(DB.Unicode)
    altitude_min = DB.Column(DB.Unicode)
    altitude_max = DB.Column(DB.Unicode)
    the_geom_4326 = DB.Column(Geometry('GEOMETRY', 4326))
    date_min = DB.Column(DB.DateTime)
    date_max = DB.Column(DB.DateTime)
    validator = DB.Column(DB.Unicode)
    observers = DB.Column(DB.Unicode)
    determiner = DB.Column(DB.Unicode)
    id_digitiser = DB.Column(DB.Integer)
    comments = DB.Column(DB.Unicode)
    meta_validation_date = DB.Column(DB.DateTime)
    meta_create_date = DB.Column(DB.DateTime)
    meta_update_date = DB.Column(DB.DateTime)
    last_action = DB.Column(DB.Unicode)
    id_nomenclature_geo_object_nature = DB.Column(DB.Integer)
    id_nomenclature_info_geo_type = DB.Column(DB.Integer)
    id_nomenclature_grp_typ = DB.Column(DB.Integer)
    id_nomenclature_obs_meth = DB.Column(DB.Integer)
    id_nomenclature_obs_technique = DB.Column(DB.Integer)
    id_nomenclature_bio_status = DB.Column(DB.Integer)
    id_nomenclature_bio_condition = DB.Column(DB.Integer)
    id_nomenclature_naturalness = DB.Column(DB.Integer)
    id_nomenclature_exist_proof = DB.Column(DB.Integer)
    id_nomenclature_diffusion_level = DB.Column(DB.Integer)
    id_nomenclature_life_stage = DB.Column(DB.Integer)
    id_nomenclature_sex = DB.Column(DB.Integer)
    id_nomenclature_obj_count = DB.Column(DB.Integer)
    id_nomenclature_type_count = DB.Column(DB.Integer)
    id_nomenclature_sensitivity = DB.Column(DB.Integer)
    id_nomenclature_observation_status = DB.Column(DB.Integer)
    id_nomenclature_blurring = DB.Column(DB.Integer)
    id_nomenclature_source_status = DB.Column(DB.Integer)
    id_nomenclature_source_status = DB.Column(DB.Integer)
    name_source = DB.Column(DB.Unicode)
    url_source = DB.Column(DB.Unicode)
    id_validation = DB.Column(DB.Integer)
    id_table_location = DB.Column(DB.Integer)
    uuid_attached_row = DB.Column(UUID(as_uuid=True))
    id_nomenclature_valid_status = DB.Column(DB.Integer)
    id_validator = DB.Column(DB.Integer)
    validation_comment = DB.Column(DB.Unicode)
    validation_date = DB.Column(DB.DateTime)
    mnemonique = DB.Column(DB.Unicode)

    def get_geofeature(self, recursif=False, columns=()):
        return self.as_geofeature(
            'the_geom_4326',
            'id_synthese',
            recursif,
            columns=columns
        )
