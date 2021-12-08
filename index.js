// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   index.js                                           :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: ciglesia <ciglesia@student.42.fr>          +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2021/12/07 16:37:49 by ciglesia          #+#    #+#             //
//   Updated: 2021/12/08 21:05:35 by ciglesia         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

const commands = require('probot-commands')

const verify = require('./lib/verify')
const close = require('./lib/close')

async function close_it (context, params) {
	const closeParams = Object.assign({}, params, {state: 'closed'});

	return context.octokit.issues.update(closeParams);
}

const salut = async (context) => {
	const pr = context.payload.pull_request;
	const user = pr.user.login;
	const msg = context.issue({
		body: `Hey @${user}, Thanks for the PR !!! You are Awesome. But I have too close it`,
	});
	context.octokit.issues.createComment(msg);
	return close_it(context, context.issue());
};

const adieu = async (context) => {
	const pr = context.payload.pull_request;
	const user = pr.user.login;
	const msg = context.issue({
		body: `Hey @${user}, Thanks for closing the PR !`,
	});
	return context.octokit.issues.createComment(msg);
};

module.exports = (app) => {
	app.log.info("contributor-agreement app loaded!");

	commands(app, 'close', close);
	commands(app, 'verify', close);

	app.on("pull_request.opened", salut);
	app.on("pull_request.reopened", salut);

	app.on("pull_request.closed", adieu);

	app.onError(async (error) => {
		context.log.error(error);
	});
};
