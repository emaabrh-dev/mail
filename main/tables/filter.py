from typing import List, Dict, Any


Operators = {
    "string": [
        {"label": "Contains (case-insensitive)", "value": "cn"},
        {"label": "Equals", "value": "eq"},
        {"label": "Starts with (case-insensitive)", "value": "bw"},
        {"label": "Ends with (case-insensitive)", "value": "ew"},
        {"label": "Is empty", "value": "nu"},
        {"label": "Is not empty", "value": "nn"},
    ],
    "number": [
        {"label": "Equals", "value": "eq"},
        {"label": "Not equals", "value": "ne"},
        {"label": "Greater than", "value": "gt"},
        {"label": "Less than", "value": "lt"},
        {"label": "Greater than or equal to", "value": "ge"},
        {"label": "Less than or equal to", "value": "le"},
        {"label": "Is empty", "value": "nu"},
        {"label": "Is not empty", "value": "nn"},
    ],
    "date": [
        {"label": "Equals", "value": "eq"},
        {"label": "Not equals", "value": "ne"},
        {"label": "Before", "value": "bt"},
        {"label": "After", "value": "at"},
        {"label": "On or before", "value": "le"},
        {"label": "On or after", "value": "ge"},
        {"label": "Is empty", "value": "nu"},
        {"label": "Is not empty", "value": "nn"},
    ],
}

def _apply_filter(self, row: Dict[str, Any], field: str, operator: str, value: str) -> bool:
    if operator == 'cn':
        return value.lower() in row.get(field, '').lower() if row.get(field) else False
    elif operator == 'nc':
        return value.lower() not in row.get(field, '').lower() if row.get(field) else False
    elif operator == 'bw':
        return row.get(field, '').lower().startswith(value.lower()) if row.get(field) else False
    elif operator == 'ew':
        return row.get(field, '').lower().endswith(value.lower()) if row.get(field) else False
    elif operator == 'nu':
        return not row.get(field)
    elif operator == 'nn':
        return bool(row.get(field))
    elif operator in ('eq', 'ne', 'gt', 'ge', 'lt', 'le'):
        field_value = row.get(field)
        if field_value is None:
            return False
        if operator == 'eq':
            return field_value == value
        elif operator == 'ne':
            return field_value != value
        elif operator == 'gt':
            return field_value > int(value) if value.isdigit() else field_value > value
        elif operator == 'ge':
            return field_value >= value
        elif operator == 'lt':
            return field_value < int(value) if value.isdigit() else field_value < value
        elif operator == 'le':
            return field_value <= value
    else:
        return False #ValueError(f"Unknown operator: {operator}")