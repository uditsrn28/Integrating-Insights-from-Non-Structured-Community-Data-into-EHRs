
pipeline {
    agent any
    stages {
        // stage('Test') {
        //     steps {
        //         sh 'node --version'
        //         sh 'svn --version'
        //         checkout scm
        //     }
        // }
        stage('Deploy'){
            steps{
                //The Jenkins Declarative Pipeline does not provide functionality to deploy to a private
                //Docker registry. In order to deploy to the HDAP Docker registry we must write a custom Groovy
                //script using the Jenkins Scripting Pipeline. This is done by placing Groovy code with in a "script"
                //element. The script below registers the HDAP Docker registry with the Docker instance used by
                //the Jenkins Pipeline, builds a Docker image of the project, and pushes it to the registry.
                script{
                    docker.withRegistry('https://build.hdap.gatech.edu'){
                        //Build and push the web application image
                        def applicationImage = docker.build("ininappdb:1.0","-f ./db/Dockerfile ./db")
                        applicationImage.push('latest')
                        
                        //Build and push the database image
                        // def databaseImage = docker.build("adewsdb:1.0", "-f ./AdverseDrugEventWarningSystem-DB/Dockerfile ./AdverseDrugEventWarningSystem-DB")
                        // databaseImage.push('latest')
                        // https://cs6440-f18-prj19.apps.hdap.gatech.edu/
                        def webApiImage = docker.build("ininapp:1.0", "-f ./app/Dockerfile ./app")
                        webApiImage.push('latest')


                    }
                }
            }
        }
        stage('Notify'){
            steps{
                script{
                    // rancher confirm: true, credentialId: 'rancher-server', endpoint: 'https://rancher.hdap.gatech.edu/v2-beta', environmentId: '1a7', environments: '', image: 'build.hdap.gatech.edu/adewsdb:latest', ports: '', service: 'ADEWS/adews-db', timeout: 60
                    rancher confirm: true, credentialId: 'rancher-server', endpoint: 'https://rancher.hdap.gatech.edu/v2-beta', environmentId: '1a7', environments: '', image: 'build.hdap.gatech.edu/ininappdb:latest', ports: '', service: 'iii/iiiiiidb', timeout: 3000
                    rancher confirm: true, credentialId: 'rancher-server', endpoint: 'https://rancher.hdap.gatech.edu/v2-beta', environmentId: '1a7', environments: '', image: 'build.hdap.gatech.edu/ininapp:latest', ports: '', service: 'iii/iiiiiiapp', timeout: 3000
                }
            }
        }
    }
}
