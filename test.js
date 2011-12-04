var pubsub = require('./pubsub');

// Some demos of pubsub stolen from Amplify.js

pubsub.subscribe( "priorityexample", function( data ) {
	console.log( "second highest priority." );
}, 2 );

// we can use the highest priority possibly
// keep other subscriptions from firing.
pubsub.subscribe( "priorityexample", function( data ) {
	console.log( "highest priority." );
	if ( data.foo === "oops" ) {
		return false;
	}
}, 1 );

// the default priority is '10'.
pubsub.subscribe( "priorityexample", function( data ) {
	console.log( "default priority." );
});

pubsub.subscribe( "priorityexample", function( data ) {
	console.log( "ultra mega high priority." );
	if ( data.foo === "baz" ) {
		return false;
	}
}, -1);

console.log("Publishing with message 'bar'");
pubsub.publish( "priorityexample", { foo: "bar" } );

console.log("\nPublishing with message 'oops'");
pubsub.publish( "priorityexample", { foo: "oops" } );

console.log("\nPublishing with message 'baz'");
pubsub.publish( "priorityexample", { foo: "baz" } );