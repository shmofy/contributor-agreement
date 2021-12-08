// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   report.js                                          :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: ciglesia <ciglesia@student.42.fr>          +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2021/12/07 23:41:16 by ciglesia          #+#    #+#             //
//   Updated: 2021/12/07 23:44:43 by ciglesia         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

const report = async ({ repos }, owner, repo, sha, state, blockers) => {
	let description = ''
	switch (state) {
    case 'success':
		description = 'All dependencies are resolved'
		break

    case 'failure':
		description = `Blocked by ${blockers.map(i => '#' + i).join()}`
		break

    default:
		description = 'Checking dependencies'
		break
	}

	repos.createStatus({ context: 'dep', description, owner, repo, state, sha })
}

module.exports = report
