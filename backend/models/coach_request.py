from pydantic import BaseModel, field_validator


class CoachRequest(BaseModel):
    user_id: str
    display_name: str
    user_input: str

    @field_validator("user_id")
    @classmethod
    def validate_user_id(cls, value):
        if not value.strip():
            raise ValueError("User ID required")
        return value

    @field_validator("display_name")
    @classmethod
    def validate_display_name(cls, value):
        if not value.strip():
            raise ValueError("Display name required")
        return value

    @field_validator("user_input")
    @classmethod
    def validate_user_input(cls, value):
        if not value.strip():
            raise ValueError("Input cannot be empty")
        return value