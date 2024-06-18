#!/bin/sh

# Set MongoDB connection details
MONGO_HOST="mongodb"
MONGO_PORT="27017"
MONGO_DB="Rooma"

# Set backup directory
BACKUP_DIR="/backups"

# Create a timestamped backup file
BACKUP_FILE="$BACKUP_DIR/mongodb-backup-$(date +%Y-%m-%d-%H-%M-%S).gz"

mkdir $BACKUP_DIR

# Dump the database to a compressed tar archive
mongodump --host $MONGO_HOST --port $MONGO_PORT --db $MONGO_DB --archive=$BACKUP_FILE --gzip

# Delete backups older than 7 days
find $BACKUP_DIR -mtime +7 -delete
