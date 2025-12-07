const Role = require('../../models/role.model')

module.exports.getList = async () => {
    let find = {deleted: false}

    return Role.find(find)
}

module.exports.createRole = async (req) => {
    const role = new Role(req.body)
    
    await role.save()
}