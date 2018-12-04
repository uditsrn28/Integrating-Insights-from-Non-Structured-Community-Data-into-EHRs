define(function (require) {

  return [
    {
      "resourceType": "Observation",
      "id": "body-weight",
      "status": "final",
      "category": [
        {
          "coding": [
            {
              "system": "http://hl7.org/fhir/observation-category",
              "code": "vital-signs",
              "display": "Vital Signs"
            }
          ]
        }
      ],
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "29463-7",
            "display": "Body Weight"
          }
        ]
      },
      "effectiveDateTime": "2018-10-03",
      "performer": {
        "reference": "Mordor Weight Loss"
      },
      "valueQuantity": {
        "value": 185,
        "unit": "lbs",
        "system": "http://unitsofmeasure.org",
        "code": "[lb_av]"
      }
    },
    {
      "resourceType": "Observation",
      "id": "body-weight",
      "status": "final",
      "category": [
        {
          "coding": [
            {
              "system": "http://hl7.org/fhir/observation-category",
              "code": "vital-signs",
              "display": "Vital Signs"
            }
          ]
        }
      ],
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "29463-7",
            "display": "Body Weight"
          }
        ]
      },
      "effectiveDateTime": "2017-10-03",
      "performer": {
        "reference": "Mordor Weight Loss"
      },
      "valueQuantity": {
        "value": 180,
        "unit": "lbs",
        "system": "http://unitsofmeasure.org",
        "code": "[lb_av]"
      }
    },
    {
      "resourceType": "Observation",
      "id": "body-weight",
      "status": "final",
      "category": [
        {
          "coding": [
            {
              "system": "http://hl7.org/fhir/observation-category",
              "code": "vital-signs",
              "display": "Vital Signs"
            }
          ]
        }
      ],
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "29463-7",
            "display": "Height"
          }
        ]
      },
      "effectiveDateTime": "2017-10-03",
      "performer": {
        "reference": "Circus Height Competition"
      },
      "valueQuantity": {
        "value": 69,
        "unit": "inches",
        "system": "http://unitsofmeasure.org",
        "code": "[lb_av]"
      }
    },
    {
      "resourceType": "Observation",
      "id": "body-weight",
      "status": "final",
      "category": [
        {
          "coding": [
            {
              "system": "http://hl7.org/fhir/observation-category",
              "code": "vital-signs",
              "display": "Vital Signs"
            }
          ]
        }
      ],
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "29463-7",
            "display": "Body Weight"
          }
        ]
      },
      "effectiveDateTime": "2018-03-03",
      "performer": {
        "reference": "Mordor Weight Loss"
      },
      "valueQuantity": {
        "value": 170,
        "unit": "lbs",
        "system": "http://unitsofmeasure.org",
        "code": "[lb_av]"
      }
    },
    {
      "resourceType": "Observation",
      "id": "body-weight",
      "status": "final",
      "category": [
        {
          "coding": [
            {
              "system": "http://hl7.org/fhir/observation-category",
              "code": "vital-signs",
              "display": "Vital Signs"
            }
          ]
        }
      ],
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "29463-7",
            "display": "Height"
          }
        ]
      },
      "effectiveDateTime": "2018-03-03",
      "performer": {
        "reference": "Circus Height Competition"
      },
      "valueQuantity": {
        "value": 68,
        "unit": "inches",
        "system": "http://unitsofmeasure.org",
        "code": "[lb_av]"
      }
    }
  ];
});