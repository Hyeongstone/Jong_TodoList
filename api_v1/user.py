from flask import request, jsonify, session

from models import AddList, AddTag, db
from . import api


@api.route('/List', methods=['GET','POST'])
def addList():
    if request.method == "POST":
        
        title = request.form.get('title')
        color = request.form.get('color')
        tag = request.form.get('tag')

        addList = AddList()
        addTag = AddTag()
        addList.title = title
        addList.color = color

        addTag.addList_title = title
        addTag.tag = tag

        db.session.add(addList)
        db.session.add(addTag)
        db.session.commit()

        return jsonify(), 201
    
    Lists = AddList.query.all()
    Tags = AddTag.query.all()

    return jsonify([mkList.serialize for mkList in Lists])
    # return jsonify([mktags.serialize for mktags in Tags])

    