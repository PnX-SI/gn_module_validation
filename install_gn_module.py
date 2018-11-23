import os
import subprocess
import psycopg2
from pathlib import Path

ROOT_DIR = Path(__file__).absolute().parent



def gnmodule_install_app(gn_db, gn_app):
    '''
        Fonction principale permettant de réaliser les opérations d'installation du module :
            - Base de données
            - Module (pour le moment rien)
    '''
    with gn_app.app_context() :
        os.makedirs(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'var/log'), exist_ok=True)
        table_sql = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data/validations.sql')
        #data_sql = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data/cmr_data.sql')

        try:
            gn_db.session.execute(open(table_sql, 'r').read())
            gn_db.session.commit()
            #gn_db.session.execute(open(data_sql, 'r').read())
            #gn_db.session.commit()
        except Exception as e:
            print(e)



def execute_script(file_name):
    """
        Execute a script to set or delete sample data before test
    """
    conn = psycopg2.connect(config['SQLALCHEMY_DATABASE_URI'])
    cur = conn.cursor()
    sql_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), file_name)
    cur.execute(open(sql_file, 'r').read())
    conn.commit()
    cur.close()
    conn.close()
