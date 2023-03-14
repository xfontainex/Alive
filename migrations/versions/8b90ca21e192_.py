"""empty message

Revision ID: 8b90ca21e192
Revises: 
Create Date: 2023-03-13 23:32:33.642010

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8b90ca21e192'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Favorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=256), nullable=True),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('Resource',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=256), nullable=False),
    sa.Column('address', sa.String(length=256), nullable=True),
    sa.Column('phone', sa.String(length=256), nullable=True),
    sa.Column('category', sa.String(length=256), nullable=True),
    sa.Column('website', sa.String(length=256), nullable=True),
    sa.Column('schedule', sa.String(length=500), nullable=True),
    sa.Column('description', sa.String(length=250), nullable=True),
    sa.Column('latitude', sa.String(length=250), nullable=True),
    sa.Column('longitude', sa.String(length=250), nullable=True),
    sa.Column('image', sa.String(length=250), nullable=True),
    sa.Column('logo', sa.String(length=250), nullable=True),
    sa.Column('icon', sa.String(length=250), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('User',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=256), nullable=True),
    sa.Column('email', sa.String(length=256), nullable=False),
    sa.Column('password', sa.String(length=256), nullable=False),
    sa.Column('is_org', sa.String(length=80), nullable=False),
    sa.Column('avatar', sa.String(length=80), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('Comment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('resource_id', sa.Integer(), nullable=True),
    sa.Column('comment_cont', sa.String(length=250), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('parentId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['parentId'], ['Comment.id'], ),
    sa.ForeignKeyConstraint(['resource_id'], ['Resource.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['User.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('Comment')
    op.drop_table('User')
    op.drop_table('Resource')
    op.drop_table('Favorites')
    # ### end Alembic commands ###