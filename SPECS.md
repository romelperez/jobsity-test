# Jobsity Test - Specs

Build forms with configurable fields by categories.

We have a list of categories, for each of them we want to create a sub-list of fields.
All the categories can have the same fields types. Each field can have different
configurations and have to be identified by an unique id. When done, a save button
will display the list of all categories fields in a JSON collection if all fields
are valid.

## Form

The form has the list of categories and a button to save or cancel it.

- Every category has an "Add" button to create a new field
- All fields are open to be edited all the time
- Fields can be swapped by position
- Each field has a "Remove" button to delete it

The save button will display a JSON collection with all the fields. Every field has
a reference to the category it belongs to. The save button is disabled until the
form is valid. For the form to be valid:

- All fields have to have an unique id and should not be duplicated
- All fields properties need to be valid

## Categories

The list is static and it is composed by:

- Device Info
- Sensors
- Settings
- Commands
- Metadata

## Fields

The list of properties is:

- Identifier: an alphanumeric string without spaces starting with a character (required)
- Description: text with at least 4 characters (required)
- Device Resource Type, which will be disabled
- Default value: the value by default and it is validated according to the field props
- Data type: according to its value, the field can display more properties
- Format: which is defined according to the data type

Data types:

- String: formats list: None, Number, Boolean, Date-Time, CDATA, URI. When:
    - None: User has to add an enumeration of alphanumeric strings
    - Number:
        - Range minimum (required)
        - Range maximum (required)
        - Units, this is a short alphanumeric string
        - Precision, is the step factor between min and max so it can not be
        more than the difference between them (required)
        - Accuracy, the same as precision
- Object: format and default value is disabled
