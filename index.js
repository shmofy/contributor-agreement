// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   index.js                                           :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: ciglesia <ciglesia@student.42.fr>          +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2021/12/07 16:37:49 by ciglesia          #+#    #+#             //
//   Updated: 2021/12/07 22:51:28 by ciglesia         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

const commands = require('probot-commands')

const verify = require('./lib/verify')
const close = require('./lib/close')

const salut = async (context) => {
	const pr = context.payload.pull_request;
	const user = pr.user.login;
	const msg = context.issue({
		body: `Hey @${user}, Thanks for the PR !!! You are Awesome.`,
	});
	return context.octokit.issues.createComment(msg);
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
