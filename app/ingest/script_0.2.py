# -*- coding: utf-8 -*-
import pandas as pd

df = pd.read_csv("dpp-outputComma.csv")

columns = []

# Age
df['AGE'] = df['AGE(or age) or DateofBirth']
MAX_AGE = 150
df.loc[df['AGE'] > MAX_AGE, 'AGE'] = -1
columns.append('AGE')

# Gender
df['GENDER'] = df['SEX(or gender)']
df.loc[df['GENDER'] == 'Male', 'GENDER'] = 1
df.loc[df['GENDER'] == 'Female', 'GENDER'] = 0
df.loc[df['GENDER'] == 'Not reported', 'GENDER'] = -1
columns.append('GENDER')

# Find HBA1c Hemoglobin A1c
for c in df.columns:
    if  df[c].dtype.kind != 'M' and df[c].min() >= 2 and df[c].max() <= 16:
        df['HBA1C'] = df[c]
        print ("Found Hemoglobin A1c values in column {0}".format(c))
        columns.append('HBA1C')
        break

# Event data
df['EVENT_DATE'] = pd.to_datetime(df['Event date(date when measurement was taken)'])
columns.append('EVENT_DATE')

"""
 Blood Pressure Levels
 Normal  systolic: less than 120 mmHg
 diastolic: less than 80mmHg
 At risk (prehypertension)   systolic: 120–139 mmHg
 diastolic: 80–89 mmHg
 High    systolic: 140 mmHg or higher
 diastolic: 90 mmHg or higher
"""

# BP Systolic
for c in df.columns:
    if df[c].dtype.kind != 'M' and df[c].min() >= 100 and df[c].max() <= 160:
        df['BP_SYSTOLIC'] = df[c]
        print ("Found Hemoglobin BP SYSTOLIC values in column {0}".format(c))
        columns.append('BP_SYSTOLIC')
        break


# BP diastolic
for c in df.columns:
    if df[c].dtype.kind != 'M' and df[c].min() >= 50 and df[c].max() <= 100:
        df['BP_DIASTOLIC'] = df[c]
        print ("Found Hemoglobin BP BP_DIASTOLIC values in column {0}".format(c))
        columns.append('BP_DIASTOLIC')
        break


# BP Session Date
try:
    df['BP_DATE'] = pd.to_datetime(df['SESSDATE'])
    columns.append('BP_DATE')
except:
    print ("Unknown Date, skipping BP Date")

# Height
for c in df.columns:
    if df[c].dtype.kind != 'M' and df[c].min() >= 3 and df[c].max() <= 10:
        df['HEIGHT_Ft'] = df[c]
        print ("Found Height in feets in column {0}".format(c))
        columns.append('HEIGHT_Ft')
        break

if not 'HEIGHT_Ft' in columns:
    for c in df.columns:
        if df[c].dtype.kind != 'M' and df[c].min() >= 36 and df[c].max() <= 120:
            df['HEIGHT_Inches'] = df[c]
            print ("Found Height in Inches in column {0}".format(c))
            columns.append('HEIGHT_Inches')
            break

if 'HEIGHT_Ft' not in columns and 'HEIGHT_Inches' not in columns:
    for c in df.columns:
        if df[c].dtype.kind != 'M' and df[c].min() >= 90 and df[c].max() <= 300:
            df['HEIGHT_Cm'] = df[c]
            print ("Found Height in Cm in column {0}".format(c))
            columns.append('HEIGHT_Cm')
            break

# BMI
for c in df.columns:
    if df[c].dtype.kind != 'M' and df[c].min() >= 15 and df[c].max() <= 45:
        df['BMI'] = df[c]
        print ("Found BMI in column {0}".format(c))
        columns.append('BMI')
        break

df[columns].to_csv("parsed_data.csv", index=False)

