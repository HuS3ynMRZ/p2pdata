
DELAY=25

mongosh --host mongo1 --port 27017 <<EOF
var config = {
    "_id": "dbrs",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "mongo1:27017",
            "priority": 2
        },
        {
            "_id": 2,
            "host": "mongo2:27017",
            "priority": 1
        },
        {
            "_id": 3,
            "host": "mongo3:27017",
            "priority": 1
        }, 
		  {
            "_id": 4,
            "host": "mongo4:27017",
            "priority": 1
        }
    ]
};
rs.initiate(config, { force: true });
rs.reconfig(config, { force: true });
EOF

echo "****** Waiting for ${DELAY} seconds for replicaset configuration to be applied ******"
sleep $DELAY

mongosh < /scripts/init.js