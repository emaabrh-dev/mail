import json
import os
from datetime import datetime, date
from dateutil.parser import parse
from dateutil.relativedelta import relativedelta
from typing import Any, Dict, List, Optional, Tuple
from PIL import Image
from io import BytesIO

#from main.person.grade import grade

none = ['', '0', 'undefined','000000000000', None, False, '0000-00-00', [], {}]

python_operators = {
    'cn': lambda x, y: str(y).lower() in str(x).lower(),
    'eq': lambda x, y: str(y).lower() == str(x).lower(),
    'bw': lambda x, y: str(x).lower().startswith(str(y).lower()),
    'ew': lambda x, y: str(x).lower().endswith(str(y).lower()),
    'nu': lambda x, _: x is None or x == '',
    'nn': lambda x, _: x is not None and x != '',
    'ne': lambda x, y: x != y,
    'gt': lambda x, y: tryInt(x) > tryInt(y),
    'lt': lambda x, y: tryInt(x) < tryInt(y),
    'ge': lambda x, y: tryInt(x) >= tryInt(y),
    'le': lambda x, y: tryInt(x) <= tryInt(y),
    'bt': lambda x, y: tryInt(x) < tryInt(y),
    'at': lambda x, y: tryInt(x) > tryInt(y),
    'sp': lambda x, y: tryInt(x) > tryInt(y),
    'sb': lambda x, y: tryInt(x) < tryInt(y),
}

def image_extensions():
    return {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"}

def copy_and_convert_image(source_path, destination_path):
    try:
        # Check if the destination directory exists
        if not os.path.exists(destination_path):
            os.makedirs(destination_path, exist_ok=True)
            
        # Get the list of existing image files in the destination directory
        existing_images = [f for f in os.listdir(destination_path) if f.endswith(image_extensions())]
        
        # Get the maximum name of existing images (considering only the numeric part)
        max_names = [tryInt(os.path.splitext(f)[0]) for f in existing_images if f.split('.')[0].isdigit()]
        max_name = max(max_names) if max_names else None

        # Increment the max name to generate the name for the new image
        new_name = str(max_name + 1) + ".jpg" if max_name is not None else "0.jpg"
        
        # Construct the destination file path
        destination_file_path = os.path.join(destination_path, new_name)
        
        # Open the image
        with Image.open(source_path) as img:
            # Convert the image to RGB (required for saving as JPG)
            img_rgb = img.convert("RGB")
            
            # Save the image as JPG
            img_rgb.save(destination_file_path, "JPEG")
            
    except Exception as e:
        # Handle any errors
        print(f"Error: {e}")

def resize_image(image_bytes, width, height):
    with Image.open(BytesIO(image_bytes)) as img:
        img = img.resize((width, height))
        img_byte_array = BytesIO()
        img.save(img_byte_array, format='JPEG')
        return img_byte_array.getvalue()

def compareDate(d, r):
    if d is not None:
        if (d>r): return True
    return False
# Python program to check if two
# to get unique values from list
# using traversal

def get_filters_list_from_string(input_string):
    filters_list = []
    
    # Split the input string by commas
    parts = input_string.split(',')
    
    # Iterate over each part
    for part in parts:
        # If part contains a hyphen, split it into a range
        if '-' in part:
            start, end = map(int, part.split('-'))
            # Generate numbers within the range and add them to filters_list
            filters_list.extend(range(start, end + 1))
        else:
            # If part doesn't contain a hyphen, parse it as a number and add to filters_list
            filters_list.append(int(part))
    
    return filters_list

def matches_filter(value, filter_criteria):
    for operator, expected_value in filter_criteria.items():
        if operator in python_operators:
            if not python_operators[operator](value, expected_value):
                return False

def compareP(a, b):
    ga = a['G']
    gb = b['G']
    if ga > gb : return True
    return False

# function to get unique values
def unique(list):
    # initialize a null list
    unique_list = []
    # traverse for all elements
    for x in list:
        # check if exists in unique_list or not
        if x not in unique_list:
            unique_list.append(x)
    return unique_list

def json_default(value):
    if isinstance(value, date):
        return value.strftime("%Y-%m-%d") #dict(year=value.year, month=value.month, day=value.day)
    else:
        return value

def display():
    return ''

def tryInt(e: str, if_nan: bool = False) -> Optional[int]:
    if e is None:
        return None if if_nan else 0
    try:
        return int(e)
    except ValueError:
        return None if if_nan else 0
        
def first(e):
    return tryInt(e[0])

def isDead(dcd: Any) -> bool:
    try:
        if isinstance(dcd, str):
            dcd = json.loads(dcd)
        return bool(dcd.get('s', False))
    except (ValueError, TypeError, AttributeError):
        # covers JSON errors, NoneType, or missing .get()
        return False

def isActive(p):
    return p

def Retraite_carriere(grade_level: int, age: int = 0, birth_date: str = None) -> date:
    retirement_date = None
    if grade_level is not None and grade_level > 0 and birth_date:
        try:
            birth_date_parsed = parse(birth_date) if not isinstance(birth_date, (date, datetime)) else birth_date
            years_to_add = next(
                (g[18] if age == 4 else g[16] for g in grade if g[0] == grade_level),
                0
            )
            retirement_date = (birth_date_parsed + relativedelta(years=years_to_add)).date()
        except (ValueError, StopIteration, TypeError) as e:
            print(f"Error calculating retirement date: {e}")
    return retirement_date

def tPSQL(k, v):
    if isinstance(v, dict) or isinstance(v, list):
        return json.dumps(v)
    elif k in ['id', 'naissance_vers', 'cin_lieu', 'groupe_sanguin', 'taille', 'position_militaire']:
        return str(tryInt(v))
    else:
        return str(v).replace("'", "`")

def create_where_clause(
    filter_dict: Dict[str, Any] = None,
    table_columns: Dict[str, List[str]] = None,
    dialect: str = "sqlite"  # Par défaut SQLite
) -> Tuple[str, Dict[str, Any]]:
    """
    Create a WHERE clause from a filter dictionary with dialect-aware syntax.

    :param filter_dict: The filter dictionary.
    :param table_columns: Dictionary of table names to their column lists.
    :param dialect: SQL dialect: 'sqlite' or 'postgresql'
    :return: Tuple of WHERE clause and unknown column filters.
    """
    if filter_dict is None:
        filter_dict = {}
    if table_columns is None:
        table_columns = {}

    where_clause = []
    not_in_cols = {}

    for key, value in filter_dict.items():
        columns = [t for t in table_columns if key in table_columns[t]]
        table_name = None if len(columns) == 0 else columns[0]

        if table_name:
            full_column_name = f"{table_name}.{key}"

            def like(expr: str) -> str:
                if dialect == "sqlite":
                    return f"LOWER({full_column_name}) LIKE LOWER('{expr}')"
                else:
                    return f"{full_column_name} ILIKE '{expr}'"

            if isinstance(value, dict):
                operator = list(value.keys())[0]
                operator_value = value[operator]

                conditions = {
                    "cn": like(f"%{operator_value}%"),
                    "eq": f"{full_column_name} = '{operator_value}'",
                    "bw": like(f"{operator_value}%"),
                    "ew": like(f"%{operator_value}"),
                    "nu": f"{full_column_name} IS NULL",
                    "nn": f"{full_column_name} IS NOT NULL",
                    "gt": f"{full_column_name} > {operator_value}",
                    "lt": f"{full_column_name} < {operator_value}",
                    "ge": f"{full_column_name} >= {operator_value}",
                    "le": f"{full_column_name} <= {operator_value}",
                    "in": f"{full_column_name} IN ({', '.join(map(repr, operator_value if isinstance(operator_value, list) else [operator_value]))})",
                    "ni": f"{full_column_name} NOT IN ({', '.join(map(repr, operator_value if isinstance(operator_value, list) else [operator_value]))})",
                }

                where_clause.append(conditions.get(operator, f"{full_column_name} = '{operator_value}'"))
            else:
                where_clause.append(f"{full_column_name} = '{value}'")
        else:
            not_in_cols[key] = value

    return " AND ".join(where_clause), not_in_cols

