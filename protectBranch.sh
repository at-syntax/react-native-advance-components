#!/bin/bash

echo "\n===>> šµļø Checking branch name"

BRANCH=`git rev-parse --abbrev-ref HEAD`
USER_EMAIL=`git config user.email`
PROTECTED_BRANCHES="^(master)"
ACCEPTED_USER_EMAIL="saikatsamanta737@gmail.com"


if [[ "$BRANCH" =~ $PROTECTED_BRANCHES && "$USER_EMAIL" != $ACCEPTED_USER_EMAIL ]]
then
  echo "\nš« Operation is not possible on remote $BRANCH branch, please create separate branch and use PR." && exit 1
fi

echo "\n>> ā Check passed. š\n==="

exit 0
