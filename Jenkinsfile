#!/usr/bin/env groovy

node {
    deleteDir()

    try {
        stage ('Prepare') {
            dir('lionnix-seller-v2') {
                git(
                    credentialsId: 'GitAccessId',
                    branch: "${env.BRANCH_NAME}",
                    url: 'git@gitlab.com:lionnix/lionnix-seller-v2.git'
                )
            }
        }

        stage ('Build') {
            dir('lionnix-seller-v2') {
                if (env.BRANCH_NAME == 'master') {
                    sh """
                        yarn install
                        cp .env.production .env.production.local
                        yarn run build
                    """
                } else if (env.BRANCH_NAME == 'dev') {
                    sh """
                        yarn install
                        cp .env.development .env.development.local
                        yarn run build --mode development
                    """
                } else {
                    echo "Not valid branch"
                    currentBuild.result = 'FAILED'
                }
            }
        }

        stage ('Deploy') {
            dir('lionnix-seller-v2') {
                sh """
                    ./run.sh -b ${env.BRANCH_NAME}
                """
            }
        }
    } catch (err) {
        currentBuild.result = 'FAILED'
        throw err
    }
}
