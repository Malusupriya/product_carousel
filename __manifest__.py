# -*- encoding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': 'Website Customisation',
    'category': 'Website/Website',
    'sequence': 20,
    'version': '1.0',
    'description': "",
    'depends': [
        'web',
        'website_sale',
        'portal',
    ],
    'installable': True,
    'data': [
        'views/view.xml',
        'views/template.xml',
    ],
    # 'qweb': [
    # ],
    'application': True,
}
