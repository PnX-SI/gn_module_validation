#!/bin/bash

. config/settings.ini

touch config/conf_gn_module.toml
echo -n "Create v_validation view"
PGPASSWORD=$user_pg_pass;psql -h $db_host -p $db_port -U $user_pg -d $db_name -b -f data/validations.sql  &>> var/log/install.log
return_value=$?
check_psql_status $return_value
