# Before running this file, execute output_writer.py

# -*- coding: utf-8 -*-
import pandas as pd
import numpy as np

def is_float(val):
    try:
        x = float(val)
        return True
    except:
        return False


def check(df, column):
    possible_nan = False
    for val in df[column]:
        if not is_float(val):
            if not possible_nan:
                possible_nan = val
            elif possible_nan != val:
                return (False, False)
    return (True, possible_nan)

df = pd.read_csv("dpp-outputComma.csv")

for c in df.columns:
    if len(df[c].unique()) == 1:
        print (f"All records have same value for column {c}; skipping")
        continue

    ret, possible_nan = check(df, c)
    #print (c , ret, possible_nan)
    if ret  == True:
        if possible_nan != False:
            print (f"Found a float column {c}, with possible nan \"{possible_nan}\"; converting")
            df[c].replace(possible_nan, np.nan, inplace=True)
            df[c] = df[c].astype(np.float64)
        if possible_nan == False:
            print (f"Found a float column {c}, with no nan; converting")
            df[c] = df[c].astype(np.float64)


columns = list()
adf = pd.DataFrame()

#Name
adf['FNAME'] = df['FNAME']
columns.append('FNAME')
df.drop(['FNAME'], axis=1, inplace=True)

adf['LNAME'] = df['LNAME']
columns.append('LNAME')
df.drop(['LNAME'], axis=1, inplace=True)

# Age
adf['AGE'] = df['AGE(or age) or DateofBirth']
MAX_AGE = 150
adf.loc[adf['AGE'] > MAX_AGE, 'AGE'] = -1
columns.append('AGE')
df.drop(['AGE(or age) or DateofBirth'], axis=1, inplace=True)


# Gender
adf['GENDER'] = df['SEX(or gender)']
adf.loc[adf['GENDER'] == 'Male', 'GENDER'] = 1
adf.loc[adf['GENDER'] == 'Female', 'GENDER'] = 0
adf.loc[adf['GENDER'] == 'Not reported', 'GENDER'] = -1
columns.append('GENDER')
df.drop(['SEX(or gender)'], axis=1, inplace=True)

# Find HBA1c Hemoglobin A1c
for c in df.columns:
    if  df[c].dtype == np.float64 and df[c].min() >= 2 and df[c].max() <= 16:
        adf['HBA1C'] = df[c]
        print ("Found Hemoglobin A1c values in column {0}".format(c))
        columns.append('HBA1C')
        df.drop([c], axis=1, inplace=True)
        break

# Event data
adf['EVENT_DATE'] = pd.to_datetime(df['Event date(date when measurement was taken)'])
columns.append('EVENT_DATE')
df.drop(['Event date(date when measurement was taken)'], axis=1)

# BP Systolic
for c in df.columns:
    if df[c].dtype == np.float64 and df[c].min() >= 100 and df[c].max() <= 160:
        adf['BP_SYSTOLIC'] = df[c]
        print ("Found Hemoglobin BP SYSTOLIC values in column {0}".format(c))
        columns.append('BP_SYSTOLIC')
        df.drop([c], axis=1, inplace=True)
        break


# BP diastolic
for c in df.columns:
    if df[c].dtype == np.float64 and df[c].min() >= 50 and df[c].max() <= 100:
        adf['BP_DIASTOLIC'] = df[c]
        print ("Found Hemoglobin BP BP_DIASTOLIC values in column {0}".format(c))
        columns.append('BP_DIASTOLIC')
        df.drop([c], axis=1, inplace=True)
        break


# BP Session Date
try:
    adf['BP_DATE'] = pd.to_datetime(df['SESSDATE'])
    columns.append('BP_DATE')
    df.drop(['SESSDATE'], axis=1, inplace=True)
except:
    print ("Unknown Date, skipping BP Date")

# Height
for c in df.columns:
    if df[c].dtype == np.float64 and df[c].min() >= 3 and df[c].max() <= 9:
        adf['HEIGHT_Ft'] = df[c]
        print ("Found Height in Feets in column {0}".format(c))
        columns.append('HEIGHT_Ft')
        df.drop([c], axis=1, inplace=True)
        break

if not 'HEIGHT_Ft' in columns:
    for c in df.columns:
        if df[c].dtype == np.float64 and df[c].min() >= 36 and df[c].max() <= 120:
            adf['HEIGHT_Inches'] = df[c]
            print ("Found Height in Inches in column {0}".format(c))
            columns.append('HEIGHT_Inches')
            df.drop([c], axis=1, inplace=True)
            break

if 'HEIGHT_Ft' not in columns and 'HEIGHT_Inches' not in columns:
    for c in df.columns:
        if df[c].dtype == np.float64 and df[c].min() >= 30 and df[c].max() <= 300:
            adf['HEIGHT_Cm'] = df[c]
            print ("Found Height in Cm in column {0}".format(c))
            columns.append('HEIGHT_Cm')
            df.drop([c], axis=1, inplace=True)
            break

# BMI
for c in df.columns:
    if df[c].dtype == np.float64 and df[c].min() >= 15 and df[c].max() <= 45:
        adf['BMI'] = df[c]
        print ("Found BMI in column {0}".format(c))
        columns.append('BMI')
        df.drop([c], axis=1, inplace=True)
        break

adf = adf.sort_values(["FNAME", "LNAME"])
print (f"Saving columns {columns} into \"parsed_data.csv\"")
adf[columns].to_csv("parsed_data.csv", index=False)

print ("--"*20)
print ("Creating future observations")
# Adding future observations
df = adf.loc[adf['EVENT_DATE'].notnull()].copy(deep=True)
df['EVENT_DATE']= pd.to_datetime(df['EVENT_DATE'])

# Increase EVENT_DATE by one year
df['EVENT_DATE'] += pd.Timedelta(days=365)

# Increase Age by one year
df.loc[adf.AGE != -1, 'AGE'] +=1

# Change height If Age < 20
if 'HEIGHT_Cm' in df.columns:
    df.loc[adf.AGE < 20, 'HEIGHT_Cm'] += np.round(np.random.uniform(2.5,5),1)

if 'HEIGHT_Inches' in df.columns:
    df.loc[adf.AGE < 20, 'HEIGHT_Inches'] += np.round(np.random.uniform(1,2),1)

if 'HEIGHT_Ft' in df.columns:
    df.loc[adf.AGE < 20, 'HEIGHT_Ft'] += np.round(np.random.uniform(0.082021,0.164042),1)


# Increase HBA1C
if 'HBA1C' in df.columns:
    df['HBA1C'] += np.round(np.random.uniform(-3, 3, size=len(df)),0)

# Increase BP_SYSTOLIC
if 'BP_SYSTOLIC' in df.columns:
    df['BP_SYSTOLIC'] += np.round(np.random.uniform(-10, 10, size=len(df)),0)

# Increase BP_DIASTOLIC
if 'BP_DIASTOLIC' in df.columns:
    df['BP_DIASTOLIC'] += np.round(np.random.uniform(-10, 10, size=len(df)),0)

# Increase BMI
if 'BMI' in df.columns:
    df['BMI'] += np.round(np.random.uniform(-5, 5, size=len(df)),0)

adf = pd.concat([adf, df])
adf = adf.sort_values(["FNAME", "LNAME"])
print (f"Saving columns {columns} into \"parsed_data_longitudinal.csv\"")
adf[columns].to_csv("parsed_data_longitudinal.csv", index=False)
