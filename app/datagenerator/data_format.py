# -*- coding: utf-8 -*-

import data_variables as var
import random

# Rio Grande Valley weight loss challenge
rgvorgcode = var.ascii_code(5,25)
def rgvchallenge_header():
    return ['Plan/Group ID', 'participant_id', 'first_name', 'last_name', 'dob1', 'gender', 'home street 1', 'home street 2', 'city', 'state', 'zip', 'email', 'cell_phone', 'home_phone', 'eligibility_date', 'program_code', 'hip_circ', 'hip_circ_date', 'waist_circ', 'waist_circ_date', 'weight', 'weight_date', 'height', 'height_date', 'bp_sys', 'bp_sys_date', 'bp_dia', 'bp_dia_date']
def rgvchallenge_rows():
    return [rgvorgcode, var.ascii_code(5, 25), var.name('english', random.choice(['M', 'F'])), var.name('english', 'family'), var.dob(), var.gender(), var.homestreet1(), var.homestreet2(), var.city(), var.state(), var.zip(), var.email(), var.cellph(), var.homeph(), var.rgvchallenge_specific_vars('enroll'), var.ascii_code(5, 10), var.hipcir(), var.valdate(), var.waistcir(), var.valdate(), var.weight(), var.valdate(), var.height(), var.valdate(), var.bps(), var.valdate(), var.bpd(), var.valdate()]

# Diabetes prevention programs
dpporgcode = var.ascii_code(5,25)
def dpp_header():
    output = ['ORGCODE', 'PARTICIP', 'FNAME', 'LNAME', 'ENROLL', 'PAYER', 'STATE', 'GLUCTEST', 'GDM', 'RISKTEST', 'AGE', 'ETHNIC', 'AIAN', 'ASIAN', 'BLACK', 'NHOPI', 'WHITE', 'SEX', 'HEIGHT', 'EDU', 'DMODE', 'SESSID', 'SESSTYPE', 'SESSDATE', 'WEIGHT', 'PA', 'HBA1C', 'GLC', 'GLCFAST']
    return output
def dpp_rows():
    output = [dpporgcode, var.ascii_code(5,25), var.name('english', random.choice(['M', 'F'])), var.name('english', 'family'), var.dpp_specific_vars('enroll'), var.dpp_specific_vars('payer'), var.state(), var.dpp_specific_vars('gluctest'), var.dpp_specific_vars('gdm'), var.dpp_specific_vars('risktest'), var.age(18, 125), var.dpp_specific_vars('ethnic'), var.dpp_specific_vars('aian'), var.dpp_specific_vars('asian'), var.dpp_specific_vars('black'), var.dpp_specific_vars('nhopi'), var.dpp_specific_vars('white'), var.gender(), var.height(), var.dpp_specific_vars('edu'), var.dpp_specific_vars('dmode'), var.dpp_specific_vars('sessid'), var.dpp_specific_vars('sessid'), var.dpp_specific_vars('sesstype'), var.dpp_specific_vars('weight'), var.dpp_specific_vars('pa'), var.hba1c(), var.glc(), var.glcfast()]
    return output