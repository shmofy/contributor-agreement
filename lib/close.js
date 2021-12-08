// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   close.js                                           :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: ciglesia <ciglesia@student.42.fr>          +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2021/12/07 23:46:09 by ciglesia          #+#    #+#             //
//   Updated: 2021/12/08 00:17:47 by ciglesia         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

const metadata = require("probot-metadata");

const close = async (context, command) => {
	console.log('Hi, it is close')
	console.log('my arguments are:', command.arguments)

	console.log(await metadata(context));

	const msg = context.issue({
		body: `Hey, I am going to close this !`,
	});

	return context.octokit.issues.createComment(msg);
}

module.exports = close
