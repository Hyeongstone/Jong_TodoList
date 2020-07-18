from flask import request, jsonify, session

from models import AddList
from . import api

@api.route('/List', methods=['GET','POST'])
def addList():
    if request.method == "POST":
        
        data = request.get_json()
        title = data.get('title')
        color = data.get('color')
        tag = data.get('tag')

        Add_List = AddList()
        Add_List.title = title
        Add_List.color = color
        Add_List.tag = tag
        
        db.session.add(Add_List)
        db.session.commit()

        return jsonify(), 201