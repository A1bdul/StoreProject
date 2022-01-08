import os
import base64
import requests

from django import template

register = template.Library()


@register.filter
def read_image_as_base64(image_url):

    if not image_url:
        return image_url

    try:
        response = requests.get(image_url)
        if response.status_code == 200:
            image_data = response.content
            image_format = os.path.splitext(image_url)[-1].replace('.', '').lower()
            encoded_string = base64.b64encode(image_data).decode('utf-8')

            if image_format in ['jpg', 'jpeg', 'png', 'gif']:
                return 'data:image/%s;base64,%s' % (image_format, encoded_string)

    except Exception as error:
        pass

    return image_url


register.filter('read_image_as_base64', read_image_as_base64)
