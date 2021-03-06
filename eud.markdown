---
layout: page
title: EUD
permalink: /eud/
---
<img style="float: left; margin-right: 10px; " height="250px"  src="../assets/images/eud.png">

<p style='text-align: justify;'>In the contemporary Internet of Things (IoT) era, people can interact with a multitude of smart devices, always connected to the Internet, in the majority of today’s environments. With lamps, thermostats, and many other appliances that can be remotely controlled, homes and workplaces are becoming “smart.” Furthermore, by using PCs and smartphones, users can access a variety of online services, ranging from social networks to news and messaging apps. The result is a complex network of connected entities, be they physical devices or virtual services, that can communicate with each other, with humans, and with
the environment. This complex scenario opens up, at the same time, possibilities and issues. By taking advantage of End-User Development (EUD) solutions, users can actively participate in the IoT by personalizing the functionality of their connected entities.
<br><br>
Nowadays, in particular, many different visual programming platforms such as <a href="https://ifttt.com/">IFTTT</a> and <a href="https://zapier.com/">Zapier</a> allow the personalization of the joint behaviors of connected entities through IFTHEN rules, i.e., in the form of “if something happens on a device or a service, then execute an action on another device or service.” The growing spread of new smart devices and online services, however, makes this personaliziation a complex task, especially for users without programming experience. The trigger-action programming paradigm, indeed, is typically implemented at a low-level of abstraction, with representation models that strongly depend on the exploited technologies. This negatively influences the rule definition process: end users experience difficulties in finding and managing the functionality they are interested in, and they are likely to introduce dangerous run-time errors in the defined IF-THEN rules.
<br><br>
Stemming from these issues, my research in the EUD context aims at assisting end users in easily and efficiently personalizing the functionality of their connected entities. Together with my research group, I explored different approaches and practical solutions to simplify the <a>definition</a> of IF-THEN rules, promote the <a>discovery</a> of new rules and related functionality, and enable the <a>debugging</a> of run-time problems in IF-THEN rules.
<br><br>
All these research works have been included in my <a href="https://iris.polito.it/handle/11583/2847152#.X7E_CxNKjlw">PhD thesis</a>. Click <a href="https://www.youtube.com/watch?v=a-mkbNZhYtQ">here</a> to watch the full video of my PhD defense!
</p>
## Definition
<img style="float: left; margin-right: 10px; " height="250px"  src="../assets/images/eupont_architecture.png">

<p style='text-align: justify;'>
To simplify the definition of IF-THEN rules, we explored the adoption of semantic-based technologies. Our EUPont ontolgy, in particular, is a high-level representation for end-user development that allows the definition of abstract and technology-independent IF-THEN rules that can be adapted to different contextual situations, independently of manufacturers, brands, and other technical details. The aim is to simplify the processes needed by end users to define personalizations: by defining IF-THEN rules such as <i>"if I enter a closed space, then cool the environment"</i>, users are not requested to specify technological details, and they can personalize the functionality of their connected entities with fewer rules, fewer mistakes, and in less time.
<br><br>
An <a href ="http://elite.polito.it/ontologies/eupont-ifttt.owl">instantiation of EUPont for IFTTT</a> models all the 379 devices and services (100%) available on the popular platform as of March, 2017. We also manually mapped in the EUPont representation 951 IFTTT triggers out of a total of 976 (97.44%), and 528 actions out of the 551 (95.83%) available on IFTTT on the same date. Moreover, EUPont has been evaluated in terms of understandability, completeness, and usefulness, especially with user studies. <br><br>
Check out the <a href="http://elite.polito.it/ontologies/eupont.owl">OWL ontology</a> and the following papers for additional details!
</p>


* **A High-Level Semantic Approach to End-User Development in the Internet of Things**, Fulvio Corno, Luigi De Russis, and Alberto Monge Roffarello, International Journal of Human-Computer Studies [[pdf]](https://iris.polito.it/handle/11583/2720712#.X7E_ZhNKjlw)
* **End User Development in the IoT: a Semantic Approach**, Alberto Monge Roffarello, Proceedings of 14th International Conference on Intelligent Environments (IE '2018) [[pdf]](https://iris.polito.it/handle/11583/2705010#.X7E-1BNKjlw)
* **A High-Level Approach Towards End User Development in the IoT**, Fulvio Corno, Luigi De Russis, and Alberto Monge Roffarello, Proceedings of the 2017 CHI Conference Extended Abstracts on Human Factors in Computing Systems (CHI ‘17) [[pdf]](https://iris.polito.it/handle/11583/2665147#.X7E_VBNKjlw)
* **A Semantic Web Approach to Simplifying Trigger-Action Programming in the IoT**, Fulvio Corno, Luigi De Russis, and Alberto Monge Roffarello, IEEE Computer [[pdf]](https://iris.polito.it/handle/11583/2691911#.X7E_5hNKjlw)

## Discovery

<img style="float: right; margin-left: 10px; " height="250px"  src="../assets/images/PC_rule_recommendations.png">
<p style='text-align: justify;'>
Besides envisioning a high-level definition of IoT personalizations, we also explored how to use the EUPont model to help users discover proper "low-level" triggers, actions, and rules without requiring any radical change in the adopted representation model.
To overcome the information overload issue that characterize contemporary platforms like IFTTT and Zapier, in particular, we explored different approaches and techniques, ranging from optimisation methods and recommendation algorithms to conversational methods. The following are the main outcomes of such an exploration.
<dl style='text-align: justify;'>
  <dt><b>EUDoptimizer</b></dt>
  <dd>
  EUDoptimizer is an optimization tool that dynamically redesign layouts in trigger-action programming interfaces in an interactive way, i.e., by considering the choices made by end users during the rule definition process. The aim is to promote the discovery of the "right" connected entity to be used for defining the trigger or the action, according to the current user need.
  </dd>
  <dt><b>RecRules</b></dt>
  <dd>
  RecRules is a hybrid and semantic recommendation system of IF-THEN rules. Its aim is to allow users to discover new rules on the basis of the underlying functionality, rather than the involved brands or manufacturers. A rule for turning on a Philips Hue lamp, for example, is functionally similar to a rule for opening the Hunter Douglas blinds, because they share a common final goal, i.e., to light up a place.
  </dd>
  <dt><b>TAPrec</b></dt>
  <dd>
  TAPrec is an End-User Development platform that supports the composition of trigger-action rules with dynamic recommendations. By exploiting RecRules, TAPrec suggests, at composition time, either a) new rules to be used or b) actions for autocompleting a rule. Recommendations, in particular, are computed to follow the user’s high-level intention, i.e., by focusing on the rules’ final purpose rather than on low-level details like manufacturers and brands.
  <p><video style="display: block; margin-top:10px; margin-left: auto; margin-right: auto;" width="560" height="315" controls plays-inline>
    <source src="../assets/videos/taprec.webm" type="video/webm">
    <source src="../assets/videos/taprec.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video></p>
  </dd>
  <dt><b>HeyTAP</b></dt>
  <dd>
  HeyTAP is a conversational and semantic-powered triggeraction programming platform able to map abstract users’ needs to executable IF-THEN rules. By interacting with a conversational agent, the user communicates her personalization intentions and preferences. User’s inputs, along with contextual and semantic information related to the available connected entities, are then used to recommend a set of IF-THEN rules that satisfies the user’s needs.
  <p><video style="display: block; margin-top:10px; margin-left: auto; margin-right: auto;" width="560" height="315" controls plays-inline>
    <source src="../assets/videos/HeyTAP.mp4" type="video/mp4">
    <source src="../assets/videos/HeyTAP.webm" type="video/webm">
    Your browser does not support the video tag.
  </video></p>
  </dd>
  <dt><b>HeyTAP<sup>2</sup></b></dt>
  <dd>
  HeyTAP<sup>2</sup> is a semantic Conversational Search and Recommendation (CSR) system that extends HeyTAP by applying a smarter recommendation algorithm and a navigation-by-preference approach. By exploiting a conversational agent, the user can communicate her current personalization intention by specifying a set of functionality at a high level, e.g., to decrease the temperature of a room when she left it. Stemming from this input, HeyTAP<sup>2</sup> implements a semantic recommendation process that takes into account a) the current user’s intention, b) the connected entities owned by the user, and c) the user's long-term preferences revealed by her profile. If not satisfied with the suggestions, the user can converse with the system to provide further feedback, i.e., a short-term preference, thus allowing HeyTAP<sup>2</sup> to provide refined recommendations that better align with the her original intention.

  </dd>
</dl>

Check out the <a href="https://git.elite.polito.it/public-projects/recrules">RecRules algorithm</a>, the <a href = "https://git.elite.polito.it/public-projects/intrec">HeyTAP<sup>2</sup> algorithm</a>, and the following papers for additional details!
</p>
* **From Users' Intentions to IF-THEN Rules in the Internet of Things**, Fulvio Corno, Luigi De Russis, and Alberto Monge Roffarello, ACM Transactions on Information Systems (TOIS) [[pdf]](https://iris.polito.it/retrieve/handle/11583/2860780/421331/hiot.pdf) 
* **HeyTAP: Bridging the Gaps Between Users' Needs and Technology in IF-THEN Rules via Conversation**, Fulvio Corno, Luigi De Russis, and Alberto Monge Roffarello, Proceedings of the International Conference on Advanced Visual Interfaces (AVI ‘20) [[pdf]](https://iris.polito.it/handle/11583/2829354#.X7E_QRNKjlw)
* **TAPrec: Supporting the Composition of Trigger-Action Rules Through Dynamic Recommendations**, Fulvio Corno, Luigi De Russis, and Alberto Monge Roffarello, Proceedings of the 25th International Conference on Intelligent User Interfaces (IUI ‘20) [[pdf]](https://iris.polito.it/handle/11583/2779432#.X7E_9xNKjlw)
* **RecRules: Recommending IF-THEN Rules for End-User Development**, Fulvio Corno, Luigi De Russis, and Alberto Monge Roffarello, ACM Transactions on Intelligent Systems and Technology (TIST) [[pdf]](https://iris.polito.it/handle/11583/2740094#.X7E_2BNKjlw)
* **EUDoptimizer: Assisting End Users in Composing IF-THEN Rules Through Optimization**, Fulvio Corno, Luigi De Russis, and Alberto Monge Roffarello, IEEE Access [[pdf]](https://iris.polito.it/handle/11583/2728803#.X7E_HhNKjlw)

## Debugging
<img style="float: left; margin-right: 10px; " height="250px"  src="../assets/images/debug.png">
<p style='text-align: justify;'>
Finally, we explore the urgent need of assessing the correctness of IF-THEN rules. Problems in trigger-action programs, indeed, negatively influence users’ ability to correctly predict the outcomes of trigger-action programs, and can lead to unpredictable and dangerous behaviors, e.g., a door that is unexpectedly unlocked. To investigate end-user debugging in the trigger-action programming context, we presented two end-user debugging tools, namely EUDebug and My IoT Puzzle.
<dl style='text-align: justify;'>
  <dt><b>EUDebug</b></dt>
  <dd>
  EUDebug is an end-user debugging tool built on top of an IFTTT-like interface that enables end users to debug their IF-THEN rules at composition time. It assists users in identifying rule conflicts, and it allows them to foresee the runtime behavior of their rules through step-by-step simulation. To model and check the run-time behavior of IF-THEN rules, we defined a novel formalism, named SCPN, based on Petri Nets and the EUPont model. With the help of EUDebug, users can successfully face computer-related concepts such as loops, inconsistencies, and redundancies. The step-by-step simulation, in particular, helps users understand why their rules might generate a specific problem.

  <p><iframe style="display: block; margin-top:10px;margin-left: auto; margin-right: auto;" src="https://www.youtube-nocookie.com/embed/iE34A1agELI" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe></p>

  </dd>
  <dt><b>My IoT Puzzle</b></dt>
  <dd>
  My IoT Puzzle is an end-user debugging tool to compose and debug IF-THEN rules based on the Jigsaw metaphor. As EUDebug, it exploits the SCPN formalism, and it is based on a set of design guidelines extracted from the literature. My IoT Puzzle represents triggers and actions as complementary puzzle pieces, and it provides users with different real-time feedback, textual and graphical explanations, by following established theories such as the interrogative debugging paradigm. The usage of different representations and visual languages facilitates users in analyzing problems and helps them understand, identify, and correct errors in IF-THEN rules.
  <br>
  <p><video style="display: block; margin-top:10px; margin-left: auto; margin-right: auto;" width="560" height="315" controls="controls" preload="none" plays-inline>
    <source type="video/mp4" src="../assets/videos/MyIoTPuzzle.mp4">
    <source type="video/webm" src="../assets/videos/MyIoTPuzzle.webm">
    Your browser does not support the video tag.
  </video></p>
  </dd>
</dl>

Check out the following papers for additional details!
</p>
* **Empowering End Users in Debugging Trigger-Action Rules**, Fulvio Corno, Luigi De Russis, and Alberto Monge Roffarello, Proceedings of the 2019 CHI Conference on Human Factors in Computing Systems (CHI ‘19) [[pdf]](https://iris.polito.it/handle/11583/2724318#.X7E-wRNKjlw)
* **My IoT Puzzle: Debugging IF-THEN Rules Through the Jigsaw Metaphor**, Fulvio Corno, Luigi De Russis, and Alberto Monge Roffarello, IS-EUD: the 7th International Symposium on End-User Development [[pdf]](https://iris.polito.it/handle/11583/2731417#.X7E_kRNKjlw)
* **A Debugging Approach for Trigger-Action Programming**, Fulvio Corno, Luigi De Russis, and Alberto Monge Roffarello, Proceedings of the 2018 CHI Conference Extended Abstracts on Human Factors in Computing Systems (CHI ‘18) [[pdf]](https://iris.polito.it/handle/11583/2701270#.X7E-phNKjlw)
