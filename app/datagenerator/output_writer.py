# -*- coding: utf-8 -*-

import csv
import data_format as form
import data_variables as var

# Diabetes prevention programs
def dpp_output(b):
    with open('dpp-output.csv', 'wb') as csvfile:
        output = csv.writer(csvfile, delimiter='|', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        output.writerow(form.dpp_header())
        for i in range(b):
            output.writerow(form.dpp_rows())

# Rio Grande Valley weight loss challenge
def rgvchallenge_output(b):
    with open('rgvchallenge-output.csv', 'wb') as csvfile:
        output = csv.writer(csvfile, delimiter='|', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        output.writerow(form.rgvchallenge_header())
        for i in range(b):
            output.writerow(form.rgvchallenge_rows())

dpp_output(20)
rgvchallenge_output(2)