from sklearn.base import BaseEstimator, TransformerMixin
import pandas as pd
import numpy as np

class TitanicUnifiedTransformer(BaseEstimator, TransformerMixin):
    def __init__(self):
        self.age_map = None
        self.emb_mode = None
        self.feature_names_out_ = [
            'Age', 'Fare', 'SibSp', 'Parch', 'FamilySize', 'Age_Class', 
            'Fare_Per_Person', 'IsAlone', 'Has_Cabin', 'Deck', 'Title', 
            'Pclass', 'Sex', 'Embarked'
        ]

    def fit(self, X, y=None):
        self.age_map = X.groupby(['Pclass', 'Sex'])['Age'].median()
        self.emb_mode = X['Embarked'].mode()[0] if not X['Embarked'].mode().empty else 'S'
        return self

    def transform(self, X):
        X = X.copy()

        mapped_ages = pd.Series(X.set_index(['Pclass', 'Sex']).index.map(self.age_map), index=X.index)
        X['Age'] = X['Age'].fillna(mapped_ages)
        X['Embarked'] = X['Embarked'].fillna(self.emb_mode)
        X['Has_Cabin'] = X['Cabin'].apply(lambda x: 0 if pd.isna(x) else 1)
        X['Deck'] = X['Cabin'].apply(lambda x: str(x)[0] if pd.notnull(x) else 'U')
        X['FamilySize'] = X['SibSp'] + X['Parch'] + 1
        X['Title'] = X['Name'].str.extract(' ([A-Za-z]+)\.', expand=False)
        X['Title'] = X['Title'].replace(['Lady','Countess','Capt','Col','Don','Dr','Major','Rev','Sir','Jonkheer','Dona'], 'Rare')
        X['Title'] = X['Title'].replace('Mlle', 'Miss').replace('Ms', 'Miss').replace('Mme', 'Mrs')
        X['Age_Class'] = X['Age'] * X['Pclass']
        X['IsAlone'] = (X['FamilySize'] == 1).astype(int)
        X['Fare_Per_Person'] = X['Fare'] / X['FamilySize']
        return X[self.feature_names_out_]

    def get_feature_names_out(self, input_features=None):
        return np.array(self.feature_names_out_)