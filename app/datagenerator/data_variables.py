# -*- coding: utf-8 -*-

import random
import string
import datetime
import pandas as pd
import numpy as np
import yaml

## General Variables
# languages = [english, spanish]; gendertype = [M, F, family]
def name(language, gendertype):
    with open('names.yml', 'r') as f:
        doc = yaml.load(f)
        output = random.choice(doc[language][gendertype])
        return output

def ascii_code(min, max):
    output = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(random.randint(min,max))])
    return output

def random_dates(start, end, n):
    start_u = start.value//10**9
    end_u = end.value//10**9
    output = pd.to_datetime(np.random.randint(start_u, end_u, n), unit='s').tolist()
    return output

def state():
    output = random.choice(['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','GU','PR'])
    return output

def age(start, end):
    output = random.randint(start, end)
    return output

def gender():
    output = random.choice(['Male', 'Female', 'Not reported'])
    return output

def height():
    output = random.randint(30,98)
    return output

def hba1c(): 
    output = random.randint(3,15)
    return output

def glc():
    output = random.randint(30,400)
    return output

def glcfast():
    output = random.choice(['Yes', 'No'])
    return output

def dob():
    datevar = random_dates(pd.to_datetime('1950-01-01'), pd.to_datetime('1995-01-01'), 1)
    output = datevar[0].date()
    return output

def hipcir():
    output = int
    return output

def valdate():
    datevar = random_dates(pd.to_datetime('2000-01-01'), pd.to_datetime('2018-01-01'), 1)
    output = datevar[0].date()
    return output

def prg():
    output = int
    return output

def homestreet1():
    output = str
    return output

def homestreet2():
    output = str
    return output

def city():
    output = str
    return output

def zip():
    output = int
    return output

def email():
    output = str
    return output

def cellph():
    output = int
    return output

def homeph():
    output = int
    return output

def waistcir():
    output = int
    return output

def weight():
    output = random.randint(70,500)
    return output

def bps():
    output = int
    return output

def bpd():
    output = int
    return output

## Diabetes Prevention Program (DPP)-specific variables
# Options = [enroll, payer, gluctest, gdm, risktest, ethnic, aian, asian, black, nhobi, white]
def dpp_specific_vars(value):
    if value == 'enroll':
        output = random.choice(["Non-primary care health professional (e.g., pharmacist, dietitian)", "Primary care provider/office or specialist (e.g., MD, DO, PA, NP, or other staff at the provider’s office)", "Community-based organization or community health worker.', 'Self (decided to come on own)", "Family/friends", "An employer or employer’s wellness program", "Insurance company", "Media (radio, newspaper, billboard, poster/flyer, etc.), national media (TV, Internet ad), and social media (Twitter, Facebook, etc.)", "Other", "Not reported"])
    if value == 'payer':
        output = random.choice(["Medicare", "Medicaid", "Private Insurer", "Self-pay", "Dual Eligible (Medicare and Medicaid", "Grant funding", "Employer", "Other", "Not reported"])
    if value == 'gluctest':
        output = random.choice(["Prediabetes diagnosed by blood glucose test", "Prediabetes NOT diagnosed by blood glucose test (default)"])
    if value == 'gdm':
        output = random.choice(["Prediabetes determined by clinical diagnosis of GDM during previous pregnancy", "Prediabetes NOT determined by GDM (default)"])
    if value == 'risktest':
        output = random.choice(['Prediabetes determined by risk test', 'Prediabetes NOT determined by risk test (default)'])
    if value == 'ethnic':
        output = random.choice(['Hispanic or Latino', 'NOT Hispanic or Latino', 'Not reported (default)'])
    if value == 'aian':
        output = random.choice(['American Indian or Alaska Native', 'NOT American Indian or Alaska Native (default)'])
    if value == 'asian':
        output = random.choice(['Asian or Asian American', 'NOT Asian or Asian American (default)'])
    if value == 'black':
        output = random.choice(['Black or African American', 'NOT Black or African American (default)'])
    if value == 'nhopi':
        output = random.choice(['Native Hawaiian or Other Pacific Islander', 'NOT Native Hawaiian or Other Pacific Islander'])
    if value == 'white':
        output = random.choice(['White', 'NOT White (default)'])
    if value == 'edu':
        output = random.choice(['Less than grade 12 (No high school diploma or GED)', 'Grade 12 or GED (High school graduate)', 'College- 1 year to 3 years (Some college or technical school)', 'College- 4 years or more (College graduate)', 'Not reported (default)'])
    if value == 'weight':
        output = random.choice([random.randint(70,500), 'Not recorded (default)'])
    if value == 'dmode':
        output = random.choice(['In-person', 'Online', 'Distance learning'])
    if value == 'sessid':
        output = random.choice([random.randint(1,26),99,88])
    if value == 'sesstype':
        output = random.choice(['Core session', 'Core maintenance session', 'Ongoing maintenance sessions (for Medicare DPP supplier organizations or other organizations that choose to offer ongoing maintenance sessions)', 'Make-up session'])
    if value == 'sessdate':
        datevar = random_dates(pd.to_datetime('2015-01-01'), pd.to_datetime('2016-01-01'), 1)
        output = datevar[0].date()
    if value == 'pa':
        output = random.choice([random.randint(0,997), 'Not recorded (default)'])
    return output

## Rio Grande Valley weight loss program-specific variables
# Options = [eldate]
def rgvchallenge_specific_vars(value):
    if value == 'enroll':
        datevar = random_dates(pd.to_datetime('2000-01-01'), pd.to_datetime('2018-01-01'), 1)
        output = datevar[0].date()
    return output