import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();
	const user: { userId: string } = request.user;
	if (data) {
		if (typeof user[data] !== 'string') {
			return null;
		}
		return user[data];
	}
	return user;
});
