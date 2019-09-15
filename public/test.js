(function () {

    const atoken = "ae254987c4fd610260da4a6fa5ee8af3c16ba983d409649bb60ac26161c158d9"
    const aserver = "http://127.0.0.1";
    const aport = 8080

    var from = document.getElementById('from');
    var to = document.getElementById('to');
    to.value = "7ZUECA7HFLZTXENRV24SHLU4AVPUTMTTDUFUBNBD64C73F3UHRTHAIOF6Q"

    var ta = document.getElementById('ta');
    var ga = document.getElementById('account');
    var st = document.getElementById('transaction');
    var wall = document.getElementById('wallet');
    var fround = document.getElementById('fround');
    var lround = document.getElementById('lround');
    var adetails = document.getElementById('adetails');
    var trans = document.getElementById('trans');
    var txid = document.getElementById('txid');
    var urldetails = document.getElementById('urldetails');
    var urlid = document.getElementById('youtubeId');
    var signKey = null;
    var account = null;

    function createWalletName() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    //acount information
    if (adetails) {
        // debugger;
        adetails.onclick = function() {
            ta.innerHTML = "";
            const algodclient = new algosdk.Algod(atoken, aserver, aport);

            (async() => {
                let tx = (await algodclient.accountInformation(account));
                var textedJson = JSON.stringify(tx, undefined, 4);
                console.log(textedJson);
                ta.innerHTML = textedJson;
            })().catch(e => {
                console.log(e);
            });


        }
    }
    //submit transaction
    if (st) {
        st.onclick = function() {
            ta.innerHTML = "";
            //var enc = new TextEncoder(); // always utf-8
            var person = { firstName: "John", lastName: "Doe", age: 50, eyeColor: "blue" };
            var note = algosdk.encodeObj(person);
            //var note = algosdk.encodeObj("This is a string converted to a Uint8Array");
            //"note": new Uint8Array(0)
            // "note": note
            txn = {
                "from": account,
                "to": to.value.toString(),
                "fee": 1000,
                "amount": parseInt(algos.value),
                "firstRound": parseInt(fround.value),
                "lastRound": parseInt(lround.value),
                "note": algosdk.encodeObj(person),
                "genesisID": "testnet-v1.0",
                "genesisHash": "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI="
            };
            var signedTxn = algosdk.signTransaction(txn, signKey);
            console.log(signedTxn.txID);
            // let algodclient = new algosdk.Algod(posttoken, aserver, aport);
            let algodclient = new algosdk.Algod(atoken, aserver, aport);
            (async() => {
                let tx = (await algodclient.sendRawTransaction(signedTxn.blob));
                var textedJson = JSON.stringify(tx, undefined, 4);
                console.log(textedJson);
                ta.innerHTML = textedJson;
                console.log(tx);
                console.log(tx.txId);
                txid.value = tx.txId;
            })().catch(e => {
                ta.innerHTML = e.text;
                console.log(e);
            });
        }
    }
    //Get transaction note
    if (trans) {
        trans.onclick = function() {
            ta.innerHTML = "";
            let algodclient = new algosdk.Algod(atoken, aserver, aport);
            (async() => {
                //alert( txid.value );
                let tx = (await algodclient.transactionInformation(account, txid.value));
                //alert(tx.noteb64);
                //alert( "got tx");
                var textedJson = JSON.stringify(tx, undefined, 4);
                console.log(textedJson);
                //alert("Note " + tx.noteb64);
                var encodednote = algosdk.decodeObj(tx.note);
                //alert(encodednote);
                ta.innerHTML = JSON.stringify(encodednote, undefined, 4);
            })().catch(e => {
                ta.innerHTML = e.text;
                if (e.text === undefined) {
                }
                console.log(e);
            });
        }
    }
    if (urldetails) {
        trans.onclick = function() {
            ta.innerHTML = "";
            var express    = require("express");
            var mysql      = require('mysql');
            var con = mysql.createConnection({
              host     : 'database-1.cjyuigvrycxc.us-east-1.rds.amazonaws.com',
              port     : '3306',
              user     : 'admin',
              password : 'master19',
              database : 'database-1'

            });
            con.connect(function(err) {
              if (err) throw err;
              con.query("CREATE TABLE IF NOT EXISTS test (id varchar(250)  NOT NULL, url varchar(250) NOT NULL default \'\', PRIMARY KEY (id));", function (err, result, fields) {
                if (err) throw err;
                console.log(result);
              });
            });
            con.connect(function(err) {
              if (err) throw err;
              con.query(str.concat("select url from test where id=)",urlid.value,";"), function (err, result, fields) {
                if (err) throw err;
                ta.innerHTML("Result: " + result);
              });
            });
        }
    }
})();
