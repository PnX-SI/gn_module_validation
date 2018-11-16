from geonature.utils.env import DB
from sqlalchemy import ForeignKey
from geonature.utils.utilssqlalchemy import (
    serializable, geoserializable
)
from sqlalchemy.dialects.postgresql import UUID
from geoalchemy2 import Geometry



@serializable
class TValidations(DB.Model):
    __tablename__ = 't_validations'
    __table_args__ = {'schema': 'gn_commons'}

    id_validation = DB.Column(
        DB.Integer,
        primary_key=True
    )
    id_table_location = DB.Column(DB.Integer)
    uuid_attached_row = DB.Column(UUID(as_uuid=True))
    id_nomenclature_valid_status = DB.Column(DB.Integer)
    id_validator = DB.Column(DB.Integer)
    validation_comment = DB.Column(DB.Unicode)
    validation_date = DB.Column(DB.DateTime)

    def __init__(self,id_validation,id_table_location,uuid_attached_row,id_nomenclature_valid_status,id_validator,validation_comment,validation_date):
        self.id_table_location = id_table_location
        self.uuid_attached_row = uuid_attached_row
        self.id_nomenclature_valid_status = id_nomenclature_valid_status
        self.id_validator = id_validator
        self.validation_comment = validation_comment
        self.validation_date = validation_date
