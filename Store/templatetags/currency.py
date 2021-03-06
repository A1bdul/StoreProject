from django import template
from django.contrib.humanize.templatetags.humanize import intcomma

register = template.Library()

@register.filter
def currency(dollars):
    dollars = round(float(dollars), 2)
    return str("₦%s%s" % (intcomma(int(dollars)), ("%0.2f" % dollars)[-3:]))


register.filter('currency', currency)
