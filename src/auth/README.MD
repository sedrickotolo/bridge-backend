# Authentication
Auth manages API endpoints for account creation and login.

## Installation

Change working directory to auth

```bash
cd bridge-backend/src/auth
```

Create a virtual environment

```python
python3 -m venv .env
```

Activate the virtual environment

Linux
```bash
. .env/bin/activate
```

Mac
```bash
. .env/bin/activate --copies
```

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install required packages

```bash
pip install -r requirements/requirements.txt
```

# Endpoints

#Join
The join endpoint is /join. This endpoint is for creating a company account.
The request requires a JSON Body in the format below

```javascript
{ 
    "first_name": "Onen",
    "last_name": "Emmanuel",
    "work_email": "emma.bridge.patterns@gmail.com",
    "organisation": "Bridge",
    "description": "Web Application",
    "product": "Crisis-text-line"
}
```

RESPONSE

201 CREATED response if successful, it returns the same JSON Object

```javascript
{ 
    "first_name": "Onen",
    "last_name": "Emmanuel",
    "work_email": "emma.bridge.patterns@gmail.com",
    "organisation": "Bridge",
    "description": "Web Application",
    "product": "Crisis-text-line"
}
```

400 BAD REQUEST error response due to duplicate work_email and organisation in the request. 
Note that, not any two organisation/company will have the same name and work email.

```javascript
{
    "message": "Account with organisation name already exists"
}
```