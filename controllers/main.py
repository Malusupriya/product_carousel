from odoo import http, models, fields, _
from odoo.http import request
from odoo.addons.website.controllers.main import QueryURL
import time


class WebsiteProductCarousel(http.Controller):

    @http.route('/product_carousel', type='http', auth="public", website=True, sitemap=True)
    def product_carousel(self, page=0, category=None, search='', ppg=False, **post):
        return request.render('website_14.product_carousel', {})

    @http.route(["/render_product_carousel"], type="json", auth="public", website=True)
    def render_product_carousel(self, domain=False, limit=10, products_per_slide=4, **kwargs):
        records = request.env["product.template"].search(domain or [], order='id desc', limit=limit)
        records_grouped = []
        records_grouped_image = []
        record_list = []
        image_list = []
        base_url = request.env['ir.config_parameter'].sudo().get_param('web.base.url')
        for index, record in enumerate(records, 1):
            record_list.append(record)
            image_url_1920 = base_url + '/web/image?' + 'model=product.template&id=' + str(record.id) + '&field=image_1920'
            image_list.append(image_url_1920)
            if index % products_per_slide == 0:
                records_grouped.append(record_list)
                records_grouped_image.append(image_list)
                record_list = []
                image_list = []
        if any(record_list):
            records_grouped.append(record_list)
            records_grouped_image.append(image_list)

        template = "website_14.s_product_carousel_items"
        return request.website.viewref(template)._render({
                "objects": records_grouped,
                "records_grouped_image": records_grouped_image,
                "keep": QueryURL("/shop"),
                "pager": request.website.pager(
                    url="/shop", total=limit, scope=7, url_args=kwargs
                ),
                "products_per_slide": products_per_slide,
                "limit": limit,
                "num_slides": len(records_grouped),
                "uniqueId": "pc-%d" % int(time.time() * 1000),
            }
        )
