import {
  Controller,
  Get,
  Post,
  Param,
  NotFoundException,
  UseGuards,
  Request,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostDto } from './dto/post.dto';
import { Post as PostEntity } from './post.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  async findAll(): Promise<PostEntity[]> {
    //get all posts in the db
    return await this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PostEntity> {
    console.log('*************');
    //find the post with this id
    const post = await this.postService.findOne(id);

    //if the post doesn't exist in the db, throw a 404 error
    if (!post) {
      throw new NotFoundException('This post doesn\t rxist');
    }

    //if post exist, return the post
    return post;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() post: PostDto, @Request() req): Promise<PostEntity> {
    //create a new post and return the newly created post
    return await this.postService.create(post, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() post: PostDto,
    @Request() req,
  ): Promise<any> {
    const { numberOfAffectedRows, updatedPost } = await this.postService.update(
      id,
      post,
      req.user.id,
    );

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException('This post doesn\t exist');
    }

    // return the updated post
    return updatedPost;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req): Promise<string> {
    //delete the post with this id
    const deleted = await this.postService.delete(id, req.user.id);

    //if the number of row affected is zero,
    //then the post doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    //return success message
    return 'Successfullt Deleted';
  }
}
