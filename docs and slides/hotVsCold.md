# 🔥 vs 🍦

Before this, I should explain producers, I'll do this in a separate document

Hot vs cold. I have seen a lot of talk about this. Most are sort of right. Actually it is quite easy.

## hot
Hot observables closes over an existing producer.

## cold
Cold observables create the producer

Yep, that's it, it is _that_ simple.

Ok, let me elaborate a tad on this.
Turns out, that hot or cold has nothing to do with single or multiple values. Also not with scarce or abundant. While those might be a reasons to pick one over the other, they are not the difference.

Let me explain by example:

<img src='./src/assets/river.jpg' style="width:290px;">
 vs
<img src='./src/assets/faucet.jpg' style="width:290px;">

River vs faucet. Really? Yes.

Somehow you can't escape mentioning streams of water in a observable talk.
Both produce water. So what is the difference.

Well, with a faucet you have full control over the stream of water. You control when it starts or stops, and you arrange the flow.

With a river you don't. You can't stop the water. (well, you might build a dam, but imagine the implications, flooding upstream, drought downstream). You can't control the flow without high impact either. But that does not mean you can't use the water from a river.

This all means, that using a hot observable, you have no control over the source. Practical examples are  things like user interactions, web-sockets, server-push.
With cold observables you have full control. things like iterators, mutations, generators, array's and so on.
