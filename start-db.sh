SERVER="postgres";
POSTGRES_HOST="127.0.0.1"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD=colmena
POSTGRES_DATABASE=colmena_lab
SCRIPT_DIR="$(pwd)/src/config/db"

docker container inspect $SERVER >/dev/null 2>&1 && docker stop $SERVER >/dev/null

docker container inspect $SERVER >/dev/null 2>&1 && docker rm $SERVER >/dev/null

echo "Starting new instance of PostgreSQL [$SERVER]"
docker run --name $SERVER -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD -p 5432:5432 -d postgres

echo "Waiting for PostgreSQL [$SERVER] to start..."
sleep 5

echo "Creating database $POSTGRES_DATABASE..."
echo "CREATE DATABASE $POSTGRES_DATABASE ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres

CREATION_SCRIPT="$SCRIPT_DIR/colmena_lab_db.sql"

echo "Executing SQL scripts..."
docker exec -i $SERVER psql -U $POSTGRES_USER -d $POSTGRES_DATABASE -f "$CREATION_SCRIPT"

echo "Database setup completed."
